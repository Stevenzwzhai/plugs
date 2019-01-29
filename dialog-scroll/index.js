/**
 * 场景： 移动端简单的自定义弹窗
 * 问题： 页面是可以滚动的，但是希望在出现弹窗后，手指滑动时页面不要跟着滚动
 * 
 * 解决方案：给document添加touchmove阻止默认事件。
 * 注意：addEventListener在chrome浏览器下默认时，使用e.preventDefault会被浏览器警告，甚至在某些场景下自定义滚动会造成滚动卡顿，因此需要添加参数passive设置为false。
 * 
 */


const enableMove = function (e) {
    e.stopPropagation();
    e.preventDefault();
};
document.addEventListener('touchmove', enableMove, {
  passive: false, capture: false
});

document.removeEventListener('touchmove', enableMove, {
  passive: false, capture: false
});