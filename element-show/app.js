/**
 * Created by Steven on 2016-10-09.
 */

function show (id, attr){
    var parent = null;
    var eleArray = null;
    var isShow = true;
    if(id){
        parent = document.getElementById(id);
    }else{
        parent = document;
    }
    if(!attr){
        attr = 'n-show';
    }
    console.log(parent);
    //在这里，用querySelectAll选择器返回的是一个nodelist，而不是数组
    var eleArray = parent.querySelectorAll('['+attr+']');
    foreach(eleArray, function(index, value){
        console.log(value.getAttribute('n-show'));
        isShow = value.getAttribute(attr);
        console.log(typeof isShow);
        if(eval(isShow)){
            value.style.display = 'block';
        }else{
            value.style.display = 'none';
        }
    })
    isShow = true;
}

//遍历循环
function foreach(array, callback, scope){
    var len = array.length;
    for(var i=0; i<len; i++){
        callback.call(scope, i, array[i]);
    }
}
