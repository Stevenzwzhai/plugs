//二分法搜索
function binary_search(datalist, keyword, index){
    let arr = datalist.slice();
    if(arr.length<2){
        if(arr[0] == keyword){
            if(index){
                return index;
            }else{
                return 0;
            }
        }else{
            return null;
        }
        
    }
    let binary_index = Math.floor(arr.length/2);
    let binary_item = arr.splice(binary_index, 1)[0];
    if(keyword === binary_item){
        return index ? index + binary_index : binary_index;
    }else if(keyword > binary_item){
        console.log(arr.slice(binary_index-1, arr.length))
        return binary_search(arr.slice(binary_index-1, arr.length), keyword, binary_index);
    }else{
        return binary_search(arr.slice(0, binary_index-1), keyword, binary_index);
    }
}
var arr = [1,2,3,4,5,6,7,8];
　　　console.log(binary_search(arr, 7));