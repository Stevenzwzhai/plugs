//顺序查找
//时间复杂度为O(n);
let arr = [1,2,3,4,5]
function search(item){
    let result = []
    for(let i = 0; i < arr.length; i++){
        if(item == arr[i]){
            result.push({
                index:i,
                value: item
            })
        }
    }
    return result;
}

console.log(search(3))