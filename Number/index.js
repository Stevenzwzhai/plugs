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

//js计算
//乘法
function calcMul(arg1, arg2) {
     let m = 0,
         s1 = arg1.toString(),
         s2 = arg2.toString();
     try {
         m += s1.split('.')[1].length;
     } catch (e) {
     }
     try {
         m += s2.split('.')[1].length;
     } catch (e) {
         
     }
     return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}
//加法
function calcAdd(arg1, arg2) {
        let m = 0,
            n = 0,
            q = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) {
        }
        try {
            n += s2.split('.')[1].length;
        } catch (e) {
        }
        q = Math.max(m, n);
        return (Number(arg1)*Math.pow(10, q) + Number(arg2)*Math.pow(10, q)) / Math.pow(10, q);
    }
//减法
    function calcReduce(arg1, arg2) {
        let m = 0,
            n = 0,
            q = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) {
        }
        try {
            n += s2.split('.')[1].length;
        } catch (e) {
        }
        q = Math.max(m, n);
        return (Number(arg1)*Math.pow(10, q) - Number(arg2)*Math.pow(10, q)) / Math.pow(10, q);
    }
//键盘只能输入数字，包括小数，传入输入框中的内容，返回数字。
function formatKeyDown(value){
        value = value.replace(/[^\d.]/g,"");
        //必须保证第一个为数字而不是.
        value = value.replace(/^\./g,"");
        //保证只有出现一个.而没有多个.
        value = value.replace(/\.{2,}/g,"");
        //保证.只出现一次，而不能出现两次以上
        value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        return value;
}







