/**
 * Created by Stevenzwzhai on 2017/2/20 0020.
 */
// 写一个 function 让下面两行代码输出的结果都为 5
console.log(sum(2, 3));
console.log(sum(2)(3));

var sum = (function() {
    var list = [];

    var add = function() {
        // 拼接数组
        var args = Array.prototype.slice.call(arguments);
        list = list.concat(args);
        return add;
    }
    // 覆盖 toString 方法
    add.toString = function() {
        // 计算总和
        var sum = list.reduce(function(pre, next) {
            return pre + next;
        });
        // 清除记录
        list.length = 0;
        return sum;
    }

    return add;
})();

//对于多个参数也适用
var add = function add() {
    var cache;
    if (arguments.length === 1) {
        cache = arguments[0];
        return function ( number ) {return cache + number;};
    }
    else return Array.prototype.reduce.call(arguments, function(a,b){
        return a+b;
    });
};
