/**
 * Created by Stevenzwzhai on 2017/2/25.
 */


/*
* 这里说明下这些方法都是针对对象数组的操作，因为一般后端返回列表数据我们都会做一些处理，处理数组一定要先拷贝，不然，你懂得
* */

/*
* 对于一些需要添加额外标识的情况，比如列表选中未选中状态
* @param {Array} list为要处理的数组
* @{param} {String} keyword为相应的键
* @{param} {String} value为相应的值
* */
function addKey(list, keyword, value){
	if(Object.prototype.toString.call(list) !== "[object Array]"){
		return [];
	}
	var list = list.slice();
	if(list.length == 0){
		return [];
	}
	var newList = list.map(function(item, index){
		if(typeof item[keyword] == "undefined"){
			item[keyword] = value || "";
		}
		return item;
	})

	return newList || [];
}
/*
 * 此处处理选择商品这类需求，选择一次商品，然后对商品做一些处理（数量改变，价格改变），然后再次选择商品，此时对于要展示的商品肯定是以新的返回的
 * 为准，但是对于跟之前选择的一样的商品，我们已经对它进行了修改，所以对于已经选择过的商品以之前选择的为准
 * @param {Array} oldList为旧数组
 * @{param} {Array} newList为新数组
 * @{param} {String} keyword为区分不同商品的关键字
 * */
function merge(oldList, newList, keyword){
	if(Object.prototype.toString.call(oldList) !== "[object Array]" || Object.prototype.toString.call(newList) !== "[object Array]"){
		return;
	}
	//在这里为了方便做新旧数组对比，我们先做了一些处理，以关键字和商品信息为键值对来保存两组数据
	var oldJson = formatArr(oldList.slice(), keyword);
	var newJson = formatArr(newList.slice(), keyword);
	var newArr = [];
	for(var key in newJson){
		if(typeof oldJson[key] !== "undefined"){
			newArr.push(oldJson[key]);
		}else{
			newArr.push(newJson[key]);
		}
	}

	return newArr;
}

function formatArr(list, keyword){
	if(Object.prototype.toString.call(list) !== "[object Array]"){
		return;
	}
	var list = list.slice();
	var newJson = {};
	list.forEach(function(item, index){
		newJson[item[keyword]] = item;
	})
	return newJson;
}