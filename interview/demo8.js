const wordStr = "a b a b ab aa ab a b";

function findMax(str) {
    let strArr = str.split(' ');
    let result = {};
    let res = [];
    let maxCount = 0;
    strArr.forEach(item => {
        if(result[item]){
            result[item]++;
        }else{
            result[item] = 1;
        }
    })

    for(let key in result){
        if(result[key]>maxCount){
            maxCount = result[key]
            res = [{[key]:result[key]}];
        }else if(result[key] == maxCount){
            res.push({[key]:result[key]})
        }
    }
    return res;
}

console.log(findMax(wordStr))