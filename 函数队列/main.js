/**
 * Created by Stevenzwzhai on 2017/2/12 0012.
 */
var stack = [];

// 定义index 和next

function fn1() {
    console.log('第一个调用');
    next();  // stack 中每一个函数都必须调用`next`
};
stack.push(fn1);

function fn2() {
    setTimeout(function fn2Timeout() {
        console.log('第二个调用');
        next();  // 调用`next`
    }, 0);
}
stack.push(fn2, function() {
    console.log('第三个调用');
    next(); // 最后一个可以不调用，调用也没用。
});

next(); // 调用next，最终按顺序输出'第一个调用'、'第二个调用'、'第三个调用'。