function deepClone(obj){
    if(typeof obj == 'function'){
        return new obj().constructor;
    }
    if(typeof obj !== 'object' || obj === null){
        return obj;
    }
    if(Object.prototype.toString.call(obj) === '[object RegExp]'){
        let g = obj.global ? 'g' : '';
        let m = obj.multiline ? 'm' : '';
        let i = obj.ignoreCase ? 'i' : '';
        return new RegExp(obj.source, g+i+m);
    }
    if(Array.isArray(obj)){
        return obj.map(item => deepClone(obj));
    }
    let newObj = {}
    for(let key in obj){
        newObj[key] = deepClone(obj[key])
    }
    return newObj;
}
var a = {
    b:[],
    c: null,
    d: undefined,
    e: Symbol(),
    f: {},
    h: {
        i: function(){}
    },
    j:/g/gim
}
console.log(deepClone(a));