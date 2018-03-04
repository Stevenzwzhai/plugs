function quicksort(arr){
    let newArr = arr.slice();
    if(newArr.length<2){
        return newArr;
    }
    let cIndex = Math.floor(newArr.length/2);
    let cItem = newArr.splice(cIndex, 1)[0];
    let left = [];
    let right = [];
    for(let i = 0; i < newArr.length; i++){
        if(newArr[i]<cItem){
            left.push(newArr[i])
        }else{
            right.push(newArr[i])
        }
    }
    return quicksort(left).concat([cItem], quicksort(right));
}

//throttle节流，一段时间内的事件都合并
function throttle(fn, delay){
    let preTime = Date.now();
    let callback = function(){
        fn.apply(this, arguments)
    }
    return function(){
        if(Date.now()-preTime > delay){
            callback();
            preTime = Date.now();
        }
    }
}
//一定时间内重复触发的都不生效，只有一定时间不触发才执行
function debounce(fn, delay){
    let timer;
    let callback = function(){
        fn.apply(this, arguments)
        timer = null
    }
    
    return function () {
    ctx = this;
    args = arguments;
    // 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 重新设置事件触发的定时器
    timer = setTimeout(callback, delay);
}