/**
 * Created by Stevenzwzhai on 2017/2/23 0023.
 */
//一般方法->使用indexOf
Array.prototype.unique = function(){
	var newArr = [];
	//此处改进一下就是直接把第一个元素先放入新数组中，可以减少一次遍历
	var len = this.length;
	for(var i = 0;i < len; i++){
		if(newArr.indexOf(this[i]) == -1){
			newArr.push(this[i]);
		}
	}
	return newArr;
}
//最快的方式，使用hash
Array.prototype.unique = function(){
	var json = {}, newArr = [], len = this.length;
	for(var i = 0; i < len; i++){
		if(typeof json[this[i]] !== "undefined"){
			json[this[i]] = true;
			newArr.push(this[i]);
		}
	}
	return newArr;
}

//适中一点
Array.prototype.unique = function(){
	//先对数组做一个排序，这样使得一样的数据就会挨在一起
	this.sort();
	var newArr = [this[0]], len = this.length;
	for(var i = 0; i < len; i++){
		if(this[i] !== newArr[newArr.length - 1]){
			newArr.push(this[i]);
		}
	}
	return newArr;
}