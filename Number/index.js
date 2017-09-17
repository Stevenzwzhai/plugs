/**
    常见的数字处理
*/
//取整
function getAbs(num){
    if(typeof num !== "number"){
        throw new Error("请传入数字");
    }

    // return num.toFixed(0);
    return num > 0 ? Math.floor(num) : Math.ceil(num);
}
//保留小数
function getFixed(num, deci){
    if(typeof num !== "number"){
        throw new Error("请传入数字");
    }

    return num.toFixed(deci||2);
}

//取千分位,小数或者整数都可以
function getThousands(num){
    if(typeof num !== "number"){
        throw new Error("请传入数字");
    }

    var numberA= String(num).split('.');
    var numberB = (numberA[0] || 0).toString(), result = '';
    while (numberB.length > 3) {
        result = ',' + numberB.slice(-3) + result;
        numberB = numberB.slice(0, numberB.length - 3);
    }
    if (numberB) { result = numberB + result; }
    return result+(numberA[1]?('.'+numberA[1]):'');
}