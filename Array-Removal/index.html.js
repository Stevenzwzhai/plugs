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
//以上就是比较常用的几种数组去重方式，当然，我们最推崇的就是用hash，因为它快，但是我们会发现有时候就不好使了，比如[1,'1'],去重之后就变成了[1],
//这是为什么呢？其实我们在使用hash的时候就是把数组元素作为hash的key值，那么在使用的过程就会把数组元素变成了字符串，所以成了上面结果，再扩展一下，
//对于Boolean、null等都会有上面的情况，所以我们不能只关注数组元素的值，还要关注它的数据类型。关于数据类型的判断,常见的typeof, instanceof。
//因此，对于key值就不能是简单的数组元素，而是应该包含该元素的数据类型，如下
Array.prototype.unique = function(){
    var json = {}, newArr = [], len = this.length;
    for(var i = 0; i < len; i++){
        var temp = typeof this[i];
        if(typeof json[this[i]] == "undefined"){
            json[this[i]] = {};
            json[this[i]][temp] = 1;
            newArr.push(this[i]);
        }else if(typeof json[this[i]][temp] == "undefined"){
            json[this[i]][temp] = 1;
            newArr.push(this[i]);
        }else{
            json[this[i]][temp]++;
        }
    }
    console.log(json);
    return newArr;
}
