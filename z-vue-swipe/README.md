## z-vue-swipe
> 这个vue组件实现了横向和垂直方向的无缝滚动，常见的场景如：banner切换（横向），公告切换（纵向）。
#### 使用方法
> 目前实现功能较为简单，只有定时滚动

1.参数
```
<swipe :speed="" :col=""></swipe>
```
speed（Number）表示切换间隔，默认3000ms，单位ms，col（Boolean）表示是否纵向，默认是横向。

2.使用
可以全局注册，使用vue.use(swipe),也可以局部引入注册。

##### [源码地址](https://github.com/Stevenzwzhai/plugs/tree/master/z-vue-swipe)

## License

[MIT](http://opensource.org/licenses/MIT)