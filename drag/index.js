let self = null
class Drag{
    constructor(el, cb){
        if(!/Element/.test(Object.prototype.toString.call(el))){
            console.error('请为存在的dom元素绑定拖拽事件')
            throw new Error('请为存在的dom元素绑定拖拽事件')
        }else{
            this.el = el;
            this.cb = cb || new Function();
            this.start = {
                x: 0,
                y: 0
            }
            this._on();
        }
        self = this;

    }
    _moveCb(e) {
        self.el.style.cssText = `
            position: fixed;
            top: ${e.clientY - self.start.y + self.el.offsetTop}px;
            left: ${e.clientX - self.start.x + self.el.offsetLeft}px;
        `
        self.start = {
                x: e.clientX,
                y: e.clientY
            }
    }
    _on(){
        console.log(this.el)
        this.el.addEventListener('mousedown', (e) => {
            this.start = {
                x: e.clientX,
                y: e.clientY
            }
            console.log('stat')
            this._move();
        })
        this.el.addEventListener('mouseup', (e) => {
            document.removeEventListener('mousemove', this._moveCb)
        })
    }
    _move(){
        document.addEventListener('mousemove', this._moveCb)
    }
}