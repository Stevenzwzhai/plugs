//节流
function throttle(fn, delay) {
    //持续触发事件时，throttle会合并一定时间内的事件，并在该时间结束时真正去触发一次事件
    var preTime = new Date().getTime();
    var callback = function() {
        fn.apply(this, arguments)
    }
    return function() {
        if (new Date().getTime() - preTime - 600 > 0) {
            callback(...arguments);
            preTime = new Date();
        }
    }
}

//debounce会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件

function debounce(fn, delay) {
    var ctx;
    var args;
    var timer = null;

    var later = function() {
        fn.apply(ctx, args);
        // 当事件真正执行后，清空定时器
        timer = null;
    };

    return function() {
        ctx = this;
        args = arguments;
        // 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        // 重新设置事件触发的定时器
        timer = setTimeout(later, delay);
    };
}