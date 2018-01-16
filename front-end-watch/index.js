const noImg = require('no-img.png');
import axios from 'axios'
import sourceMap from 'source-map'
//性能问题
window.onload = function(){
    let timer = setTimeout(function(){
        clearTimeout(timer);
        const timeObj = window.performance.timing;
        //白屏时间
        console.log('white-page-time:'+(timeObj.domLoading-timeObj.fetchStart))
        //request
        console.log('request-time:'+(timeObj.responseEnd - timeObj.requestStart))
        //首屏时间
        console.log('first-page-time:'+(timeObj.loadEventEnd-timeObj.fetchStart))
        //dom解析时间
        console.log('dom-parse-time:'+(timeObj.domComplete-timeObj.domInteractive));
        console.log('lookup-dns-time: ' + (timeObj.domainLookupEnd - timeObj.domainLookupStart));
        console.log('TCP-connect-time: ' + (timeObj.connectEnd - timeObj.connectStart));
        console.log('redirect-time: ' + (timeObj.redirectEnd  - timeObj.redirectStart));
    }, 3000)


//错误监控
window.addEventListener('error', function(data) {
    const target = data.target;
    if(target) {
        switch (target.nodeName) {
            case 'IMG': (() => {
                //对于请求失败的图片同样设置为默认图片
                var img = new Image();
                img.src = noImg;
                //判断图片大小是否大于0 或者 图片高度与宽度都大于0
                if (img.filesize > 0 || (img.width > 0 && img.height > 0)) {
                    target.src = noImg;
                } else {
                    //默认图片也不存在的时候
                }
            })();
                break;
            default: console.warn({
                message: data.message,
                line: data.lineno,
                col: data.colno,
                errpath: data.path,
                filename: data.filename,
                url: data.url
            });
        }
    } else {
        console.warn({
            message: data.message,
            line: data.lineno,
            col: data.colno,
            errpath: data.path,
            filename: data.filename,
            url: data.url
        });
        //错误提交
        getMap(data.filename+'.map', function(data){
            let smc = new sourceMap.SourceMapConsumer(data);
            let originPos = smc.originalPositionFor({
                line: errorMessage.lineno,
                column: errorMessage.lineno
            });
            let xhr = errorMessage.error.xhr || {};
            let errMes = {
                message: errorMessage.message,
                filename: errorMessage.filename,
                scriptURI: scriptURI,
                lineNo: originPos.line,
                colNo: originPos.column,
                errorObj: errorObj,
                xhr:{
                    ...xhr,
                    status:xhr.status,
                    statusText:xhr.statusText,
                    withCredentials:xhr.withCredentials
                }
            };
            axios.post("http://localhost:30010/error", {
                headers: {"Content-Type": "application/json"},
                errMes
            }).then(function (res) {
                console.log(res);
                res.json().then(function (data) {
                    console.log(data);
                });
            });
        })
    }

    return true;
}, true);
function getMap(path, fn){
    axios.get(path).then(fn)
}