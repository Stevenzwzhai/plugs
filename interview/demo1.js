//给定整数 n 和 m，写一个函数 dispatch ，把 1-n 尽量平均地分成m个组
//如
//var n = 2, m = 2;

//dispatch(n, m) 得到[[1], [2]];

function dispatch(n, m){
    let restNums = n%m;
    let intervalIndex = Math.floor(n/m)
    let result = []
    let allArr = new Array(n).fill(1).map((i, index) => index);
    console.log(restNums, intervalIndex, allArr)
    for(let i=0; i < (m-restNums)*intervalIndex; i+=intervalIndex){
        console.log(i)
        result.push(allArr.slice(i, i+intervalIndex));
    }
    for(let j = (m-restNums)*intervalIndex; j < n; j+=(intervalIndex+1)){
        
        result.push(allArr.slice(j, j+intervalIndex+1))
    }

    return result
}

console.log(dispatch(20, 7))