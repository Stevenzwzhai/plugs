/**
 * Created by Steven on 2016-10-25.
 */
var oTxt = document.getElementById('txt');
var oBtn = document.getElementById('btn');
var oList = document.getElementById('list');

var fruits = ["桃子","苹果","梨子","香蕉","香瓜","葡萄","柠檬","橘子","草莓"];
//点击事件
oBtn.addEventListener('click', function(){
    var keyWord = oTxt.value;
    // var fruitList = searchByIndexOf(keyWord,fruits);
    console.log(fruitList);
    var fruitList = searchByRegExp(keyWord, fruits);
    renderFruits(fruitList);
}, false);
//回车查询
oTxt.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        var keyWord = oTxt.value;
        // var fruitList = searchByIndexOf(keyWord,fruits);
        var fruitList = searchByRegExp(keyWord, fruits);
        renderFruits(fruitList);
    }
}, false);

function renderFruits(list){
    if(!(list instanceof Array)){
        return ;
    }
    oList.innerHTML = '';
    var len = list.length;
    var item = null;
    for(var i=0;i<len;i++){
        item = document.createElement('li');
        item.innerHTML = list[i];
        oList.appendChild(item);
    }
}

//模糊查询1:利用字符串的indexOf方法
function searchByIndexOf(keyWord, list){
    if(!(list instanceof Array)){
        return ;
    }
    var len = list.length;
    var arr = [];
    for(var i=0;i<len;i++){
        //如果字符串中不包含目标字符会返回-1
        if(list[i].indexOf(keyWord)>=0){
            arr.push(list[i]);
        }
    }
    return arr;
}
//正则匹配
function searchByRegExp(keyWord, list){
    if(!(list instanceof Array)){
        return ;
    }
    var len = list.length;
    var arr = [];
    var reg = new RegExp(keyWord);
    for(var i=0;i<len;i++){
        //如果字符串中不包含目标字符会返回-1
        if(list[i].match(reg)){
            arr.push(list[i]);
        }
    }
    return arr;
}
renderFruits(fruits);