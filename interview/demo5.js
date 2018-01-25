// 写一个方法，在一个未知对象中，找出所有的“李鹏”。并 console.log 对象输出它的引用地址，以及对应值以及当前所在对象和当前对象有多少个目标值。
var tarrgetObj = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        name: "百度"
                    }
                },
                l: {
                    name: "李鹏--> QQ:3206064928"
                }
            }
        }
    },
    d: "90",
    e: "90",
    l: {
        a: {
            b: {
                c: {
                    version: "1.0.0.1",
                    name: "李鹏--> QQ:3206064928"
                }
            }
        }
    },
    f: {
        name: "李鹏--> QQ:3206064928",
        update: "2017年03月20日"
    }
}
function getKeyWord(obj, keyword) {
    let pathArray = [];

    function get(obj, prepath, keyword) {

        let pre = ""
        for (let key in obj) {
            if (obj[key]) {
                if (typeof obj[key] == 'string' && new RegExp(keyword, 'g').test(obj[key])) {
                    pathArray.push({
                        [keyword]: prepath ? (`${prepath},${key}`): key
                    })
                } else if (typeof obj[key] == "object") {
                    if (prepath) {
                        pre = `${prepath},${key}`;
                    } else {
                        pre = key
                    }
                    get(obj[key], pre, keyword)
                }
            }
        }
    }
    get(obj, '', keyword) 
    return pathArray;
}

console.log(getKeyWord(tarrgetObj, '李鹏'));
