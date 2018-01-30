//函数柯里化
又称部分求值（Partial Evaluation），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
1.延迟执行
var add = (function(){
    let numList = [];
    return function(){
        let arg = Array.from(arguments);
        if(arg.length){
            numList = numList.concat(arg)
        }else{

            return numList.reduce((pre, next) => pre+next)
        }
    }
})()

add(1)
add(2)
add() //在此时才进行计算和print 3
Function.bind = Function.bind || function(){
    let obj = Array.from(arguments)[0];
    let args = Array.from(arguments).slice(1);
    let self = this;
    return function(){
        return self.apply(obj, args)
    }
}
2.提前返回
会根据参与先返回一个函数
事件绑定的兼容处理
var addEvent = (function() {
    if (window.addEventListener) {
        return function(node, type, cb, options) {
            if (Object.prototype.toString.call(options) !== "[object Object]" || typeof options !== "boolean") {
                options = false;
            }
            node.addEventListener(type, cb, options)
        }
    } else if (window.attachEvent) {
        return function(node, type, cb, options) {
            if (Object.prototype.toString.call(options) !== "[object Object]" || typeof options !== "boolean") {
                options = false;
            }
            node.attachEvent('on' + type, cb)
        }
    }
})()
这样只需要执行一次判断即可。
3.参数复用

