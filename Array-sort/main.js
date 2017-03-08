/**
 * Created by Stevenzwzhai on 2017/3/8.
 */
//处理特殊情况
function defaultDeal(arr){
	//还是先判断数据类型，以及一些特殊情况的处理
	if(Object.prototype.toString.call(arr) !== "[object Array]"){
		throw new Error("必须是数组");
	}
	if(arr.length < 2){
		return arr;
	}
}

//冒泡排序
function bubbleSort(arr){
	if(defaultDeal(arr)){
		return defaultDeal(arr);
	}
	var _arr = arr.slice();
	var len = _arr.length;
	var i = 1, j = 1;
	//这里比较次数为len-1,所以从i=1开始
	for(i; i<len; i++){
		//这里从第二位开始检测，减少次数，而最后一个是不用对比的，因为在倒数第二位对比的时候已经对最后一位进行了对比
		for(j = 1; j<len; j++){
			var temp = null;
			//从大到小或者从小到大改变比较方向即可
			if(_arr[j] < _arr[j-1]){
				temp = _arr[j];
				_arr[j] = _arr[j-1];
				_arr[j-1] = temp;
			}
		}
	}
	return _arr;
}

//快排
function quickSort(arr){
	if(defaultDeal(arr)){
		return defaultDeal(arr);
	}
	var _arr = arr.slice();
	var len = _arr.length;
	var leftArr = [], rightArr = [];
	//取一个中间值
	var temp = _arr[Math.floor(len/2)];
	//去掉中间值，此时length要减一
	_arr.splice(Math.floor(len/2),1);
	for(var i = 0; i<len-1; i++){
		if(_arr[i] < temp){
			leftArr.push(_arr[i]);
		}else{
			rightArr.push(_arr[i]);
		}
	}
	return quickSort(leftArr).concat(temp, quickSort(rightArr));
}