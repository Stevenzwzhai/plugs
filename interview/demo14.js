function event(){
    this.events = {};
}

event.prototype.on = function(name, cb){
    if(typeof name !== 'string'){
        throw new Error('must use a string name')
    }
    if(typeof cb !== 'function'){
        throw new Error('must use a function')
    }
    if(this.events[name]){
        this.events[name].push(cb);
    }else{
        this.events[name] = [cb];
    }
}

event.prototype.fire = function(name){
    if(typeof name !== 'string'){
        throw new Error('must use name fire')
    }
    if(!this.events[name]){
        throw new Error('no callback')
    }
    this.events[name].forEach(function(cb, index){
        cb()
        if(cb.once){
            this.events[name].splice(index, 1);   
        }
    })
}

event.prototype.once = function(name, cb){
    if(typeof name !== 'string'){
        throw new Error('must use a string name')
    }
    if(typeof cb !== 'function'){
        throw new Error('must use a function')
    }
    cb.once = true;
    if(this.events[name]){
        this.events[name].push(cb);
    }else{
        this.events[name] = [cb];
    }
}

event.prototype.remove = function(name){
    if(typeof name !== 'string'){
        throw new Error('must use a string name')
    }
    delete this.events[name]
}
