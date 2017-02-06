/**
 * Created by Stevenzwzhai on 2017/2/6.
 */
/*
* 事件注册触发
* */
class Emitter {
    constructor () {
        this.events = {};
    }
    //register
    on (event, callback) {
        let callbacks = this.events[event]["callbacks"] || [];
        callbacks.push(callback);
        this.events[event]["callbacks"] = callbacks;
    }
    //emitter
    fire (event) {
        let callbacks = this.events[event]["callbacks"];
        let isOnce = this.events[event]["isOnce"];
        if(!callbacks || callbacks.length === 0){
            throw new Error('no register this event');
        }
        let args = Array.prototype.slice.call(arguments, 1);
        callback.forEach(fn => fn.apply(fn, args));
        if(isOnce){
            this.off(event);
        }
    }
    //offEvent
    off (event) {
        delete this.events[event];
    }
    //once
    once (event, callback) {
        this.on(event, callback);
        this.events[event]["isOnce"] = true;
    }
}