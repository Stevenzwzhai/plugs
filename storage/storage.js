import Base64 from './base64'
//定义你的主命名，之后会保存在这个对象中。
const storage = "storageName";
const base64 = new Base64();

export default{
	//查localStorage
	lg(key){
        if(!key){
            return null;
        }

        let lStore = window.localStorage.getItem(storage);
        let store = lStore ? JSON.parse(base64.decode(lStore)) : {};

        return store = store[key]
    },
    //存localStorage
    ls(key, item){
        if(!key){
            console.error('没有key')
        }
        let lStore = window.localStorage.getItem(storage);
        //注意第一次存储的时候
        let store = lStore ? JSON.parse(base64.decode(lStore)) : {};
        store[key] = item || "";
        window.localStorage.setItem(storage,base64.encode(JSON.stringify(store)));
    },
    //查session
    slg(key){
        if(!key){
            return null;
        }
        let lStore = window.sessionStorage.getItem(storage);
        let store = lStore ? JSON.parse(base64.decode(lStore)) : {};
        return store = store[key]
    },
    //存session
    sls(key, item){
        if(!key){
            console.error('没有key')
        }
        let lStore = window.sessionStorage.getItem(storage);
        let store = lStore ? JSON.parse(base64.decode(lStore)) : {};
        store[key] = item || "";
        window.sessionStorage.setItem(storage,base64.encode(JSON.stringify(store)));
    }
}