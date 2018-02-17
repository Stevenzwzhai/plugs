//请用 JavaScript 实现，控制一个文本框只能输入正整数，如输入不符合条件则文本框全 部字体标红。要求写出完整的文本框 HTML 代码和 JavaScript 逻辑
function isNum() {
    var txtField = document.getElementById('txt');
    var txt = txtField.value;
    var regexp = /^\d*$/;
    if (regexp.test(txt)) {
        txtField.style.color = "#000";
    } else {
        txtField.style.color = "#f00";
    }
}