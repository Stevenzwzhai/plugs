//节流
function throttle(fn, delay){
    //持续触发事件时，throttle会合并一定时间内的事件，并在该时间结束时真正去触发一次事件
    var preTime = new Data().getTime();
    var callback = function(){
        fn.applay(this, arguments)
    }
    return function(){
        if(new Date().getTime - preTime - delay){
            callback(arguments);
            preTime = new Date();
        }
    }
}