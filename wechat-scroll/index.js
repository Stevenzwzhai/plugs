//关于微信浏览器中不显示“x5内核”的解决方案

第一种：实现自定义的滑动方案，利用translate来实现滚动，这样就可以避开原生scroll，比如iScroll等，注意必须不能是利用原生scroll实现。
第二种：禁止页面滚动，而在某些需要滚动的页面特殊控制，但在父元素需要有如下代码
document.body.addEventListener('touchmove', function(evt) {
    //防止微信浏览器标示出现
    if(!evt._isScroller) {
        //只有设置滚动元素的event事件对象属性_isScroller为true的时候该对象才可以滚动
        evt.preventDefault();
    }
},{
    passive:false,
    capture:false
});
document.addEventListener('touch', function(e){
    e.preventDefault();
}, false)

<div id="scroll"></div>
document.getElementById('scroll').addEventListener('touchstart', (event) => {
    event._isScroller = true;
})
这样div元素可以滚动，但是最好是局部滚动，如果是控制整个页面还是会出现微信浏览器标示。
推荐使用translate来实现滚动。