/*
    基于 Localstorage 设计一个 1M 的缓存系统，需要实现缓存淘汰机制
*/
/*
    函数，undefined等无法存储
    单位M，max=5
*/
function storeSys(limit, safe) {
    if (typeof window !== 'object' || typeof window.localstorage !== 'function') {
        throw new Error('must use in browser')
    }
    this.limit = Number(limit)
    if (typeof this.limit !== 'number') {
        throw new Error('limit must use number or stringNumber')
    }
    this.limit = this.limit > 5 ? 5 : this.limit;
    this.limit*=1024*1024;
    this.globalKey = createRandomId();
    this.store = {}
    this.safe = safe;
    this.base64 = new Base64();
}


storeSys.prototype.set = function(key, value, expire) {
    if(typeof key !== 'string'){
        throw new Error('key must a string')
    }
    this.store[key] = {
        date: Date.now()
        value: value,
        expire: expire
    };
    let storeStr = this.safe ? this.base64.decode(JSON.stringify(this.store)) : JSON.stringify(this.store);
    if(this.storeStr.length >= storeStr.length){
        delete this.store[key]
        throw new Error('内存超出，无法存储')
        return;
    }
    window.localStorage.setItem(this.globalKey, storeStr)
}
storeSys.prototype.get = function(key) {
    if(!this.store[key]){
        return `${key}值不存在`;
    }else if(this.store[key].expire < Date.now()){
        this.clear(key)
        return `${key}值存储已过期`;
    }else{
        return this.store[key].value;
    }
}
storeSys.prototype.clear = function(key) {
    if(key){
        delete this.store[key]
    }else{
        this.store = {};
    }
    let storeStr = this.safe ? this.base64.decode(JSON.stringify(this.store)) : JSON.stringify(this.store);
    window.localStorage.setItem(this.globalKey, storeStr)
}


function createRandomId() {
    return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
}

function Base64() {

    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    let _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    var _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = 0,
            c1 = 0,
            c2 = 0,
            c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}