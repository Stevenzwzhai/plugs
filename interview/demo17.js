//deepClone

function deepClone(obj){
    if(obj === null){
        return obj;
    }
    if(typeof obj === 'function'){
        return new obj().constructor;
    }
    if(Array.isArray(obj)){
        return obj.map(item => deepClone(obj));
    }
    if(Object.prototype.toString.call(obj) === '[object RegExp]'){
        let g = obj.global ? 'g' : '';
        let m = obj.multiline ? 'm' : '';
        let i = obj.ignoreCase ? 'i' : '';
        return new RegExp(obj.source, g+i+m);
    }
    if(typeof obj === 'object'){
        let result = {};
        for(key in obj){
            result[key] = deepClone(obj[key]);
        }
        return result;
    }
    return obj;
}

var a = {
    b:[],
    c: null,
    d: undefined,
    e: Symbol(),
    f: {},
    h: {
        i: function name(){}
    },
    j:/g/gim
}
// deepClone(a).h.i();