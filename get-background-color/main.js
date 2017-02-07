/**
 * Created by Stevenzwzhai on 2017/2/6.
 */

//字符串转换为驼峰
function camelize(str){
    return str.replace(/-(\w)/g, function(strMatch, newStr){
        return newStr.toUpperCase();
    })
}

//获取计算后的样式
function getStyle(ele, property) {
    if (!ele || !property) {
        return;
    }
    var defaultValue = ele.style[camelize(property)];
    var css = null;
    if (!defaultValue) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
            css = document.defaultView.getComputedStyle(ele, null);
            defaultValue = css ? css.getPropertyValue(property) : null;
        }

    }
    return defaultValue;
}
//检查获取背景色的有效性
function checkBgColor(ele){
    var defaultValue = getStyle(ele, "background-color");
    var hasColor = defaultValue ? true : false;
    if(value == "transparent" || value == "rgba(0,0,0,0)"){
        hasColor = false;
    }else if(getStyle(ele, "display") == "none" || getStyle(ele, "visivility" == "hidden")){
        hasColor = false;
    }else if(getStyle(ele, "opacity") == "0"){
        hasColor = false;
    }
    return hasColor;
}

//检测父节点
//这里检测父节点主要是针对父节点设置了隐藏属性(display:none;visibility:hidden;)
function checkParent(ele){
    var parent = ele.parentNode;
    var hasColor = true;
    //一般来说是不会把body设为隐藏
    if(parent.nodeName == "BODY"){
        return hasColor;
    }
    if(getStyle(parent, "display") == "none" || getStyle(parent, "visivility" == "hidden")){
        hasColor = false;
        return hasColor;
    }else{
        checkParent(parent);
    }
}
//获取最终颜色
function getRealBg(ele){
    //如果父元素为隐藏，就不用再获取元素
    if(!checkParent(ele)){
        return ''
    }
    if(checkBgValue(ele)){
        return getStyle(ele, 'background-color');
    }else if(ele != document.documentElement){
        return getRealBg(ele.parentNode);
    }
    return '';
}