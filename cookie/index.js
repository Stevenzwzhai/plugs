class Cookie{
    constructor(){
        this.cookie = document.cookie;
        this._parse(this.cookie);
    }
    _parse(cookie){
        this.cookeiObj = new Map(this.cookie.split(';').map(item => item.split('=')))
    }
    set(key, value){
        if(arguments.length === 1 && /=/.test(key) && typeof key === 'string'){
            document.cookie+=key;
        }
        if(typeof value !== "string"){
            throw new Error('key must be a string')
        }
        let cookieStr = encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(value));
        document.cookie+=cookieStr;
        this.cookie = document.cookie;
        this.cookieObj[key] = value;
    }
    get(key){
        return this.cookieObj[key];
    }
    setPath(path){
        this.set('path', path)
    }
    setExpir(date){
        this.set('date', date)
    }
    setDomain(domain){
        this.set('domain', domain)
    }
    setSecure(flag){
        if(this.cookieObj['secure']){

        }else{
            if(flag){
                document.cookie+=';secure'
            }else{
                document.cookie = document.cookie.replace(';secure')
            }
        }
        this.cookieObj['secure'] = falg;
    }
}