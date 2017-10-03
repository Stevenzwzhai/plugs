// 在移动端我们在点击一个区域块的时候往往想要手指按下的时候该元素的背景色有些变化，或是其他样式上变化
//这里是一个vue的指令，当然如果不用vue直接把里面的东西拿出来也是可以使用的
//目标元素设置data自定义属性（data-touch=“”），多个列表元素可以事件委托使用，样式类名（active）
'tcc': {
        inserted(el){
            el.addEventListener('touchstart', function(e){
                let target = e.target;
                if(target.dataset.touch === 'true'){
                    target.classList.add('active')
                }
            })
            el.addEventListener('touchmove', function(e){
                let target = e.target,
                    rect = target.getBoundingClientRect();
                if(target.dataset.touch === 'true'){
                    // 移出元素时，取消active状态
                    if(e.changedTouches[0].pageX<rect.left || e.changedTouches[0].pageX>rect.right || e.changedTouches[0].pageY<rect.top || e.changedTouches[0].pageY>rect.bottom){
                        target.classList.remove('active')
                    }
                }
            })
            el.addEventListener('touchcancel', function(e){
                let target = e.target;
                if(target.dataset.touch === 'true'){
                    target.classList.remove('active')
                }
            })
            el.addEventListener('touchend', function(e){
                let target = e.target;
                if(target.dataset.touch === 'true'){
                    target.classList.remove('active')
                }
            })
        }
    }