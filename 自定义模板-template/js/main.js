//在这里只是用vue的渲染函数
var vm = new Vue({
	el: '#div-template',
	data: {
		data1: [{
			id: 1,
			name: "客户名称"
		}, {
			id: 2,
			name: "客户联系人"
		}],
		data2: [{
			id: 3,
			name: "会员姓名"
		}, {
			id: 4,
			name: "会员等级"
		}],
		data3: [{
			id: 5,
			name: "门店名称"
		}, {
			id: 6,
			name: "消费时间"
		}]
	}
})

//在这里主要是对可编辑区域的操作,主要是监控按键操作
var obj = document.querySelector('textarea');

//首先定义焦点位置为空，这样初始化页面之后点击关键字，关键字就不会添加到文本中
var cursorIndex = null;
//这里定义一个最后一次按键是为了判断左键是不是由于按左中括号而带动的。
var lastKeyCode = 0;
//记录所添加的关键字
var allKeyWords = [];
//把所有的关键字以内容为key,id为value保存，以便于提交的时候获取相应id
var keyWordsJson = {};
//这里处理
var newData = vm.data1.concat(vm.data2).concat(vm.data3);
var i=0,len=newData.length;
for(i;i<len;i++){
	if(keyWordsJson[newData[i].name]!==null){
		keyWordsJson[newData[i].name]=newData[i].id;
	}
}
//点击可编辑区域时要对光标更新
obj.addEventListener('click', function() {
	cursorIndex = getFocus(obj);
	dealFocusExtend(obj,cursorIndex);
})

obj.addEventListener('keyup', function(e) {
	//每次在文本域中输入的时候都要获取其光标位置，以便于其他操作
	cursorIndex = getFocus(obj);

	//由于我们是禁止输入中文中括号的，而中文中括号输入左右情况不同，需要分别处理
	if (e.keyCode == 219) {
		e.preventDefault();
		//这里获取到光标左侧的内容
		var leftChar = obj.value.slice(cursorIndex - 1, cursorIndex);

		//只有输入结束的是右中括号，而且它的前一个字符是左中括号才把它删除，防止把关键字删除掉
		if (/\】/g.test(leftChar) && obj.value.charAt(cursorIndex - 2) === '【') {
			obj.value = obj.value.slice(0, cursorIndex - 2) + obj.value.slice(cursorIndex, obj.value.length);
		}

	} else if (e.keyCode == 221) {
		e.preventDefault();
		//右中括号就好办多了，因为它不会自动带出左中括号
		var leftChar = obj.value.slice(cursorIndex - 1, cursorIndex);
		if (/\】/g.test(leftChar)) {
			obj.value = obj.value.slice(0, cursorIndex - 1) + obj.value.slice(cursorIndex, obj.value.length);
		}
	}
	//防止上下左右键移动光标进入关键字中
	if ((e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 40) && lastKeyCode !== 219) {
		dealFocusMove(obj, cursorIndex);
	} else if (e.keyCode == 8) {
		//backspace删除的时候删除整个关键字
		dealFocusL(obj, cursorIndex, allKeyWords);
	} else if (e.keyCode == 46) {
		//delete删除的时候也是删除整个关键字
		dealFocusR(obj, cursorIndex, allKeyWords)
	}
	if (e.keyCode !== 37 && e.keyCode !== 39) {
		//这里防止手动按得左右键影响左中括号判断
		lastKeyCode = e.keyCode;
	}
}, false);

obj.addEventListener('keydown', function(e) {
	if (e.keyCode == 221 || e.keyCode == 219) {
		//这里防止按下英文中括号，你没看错，这里就是坑，英文的可以直接阻止默认事件，但是中文的不可以
		e.preventDefault();
	}
	if ((e.keyCode == 37 || e.keyCode == 39) && lastKeyCode === 219) {
		//这里是防止按下中文中括号左键的时候带动左右键的按下，这样保证光标一直在最后
		e.preventDefault();
	}
}, false);

//现在做添加关键字事件，首先明白一点，就是只有我们在文本域中有光标的时候点击添加关键字才可以添加，而点击其他地方失去光标，再点击关键字的时候是不可以添加的
//所以我们给document添加事件,利用事件冒泡
document.addEventListener('click', function(e) {
	//首先判断是否有光标，这样我们的光标位置是不存在的
	if (cursorIndex !== null) {
		//这里判断是否是我们要点击的是不是关键字
		if (e.target.tagName !== "TEXTAREA" && e.target.getAttribute('isFocus')) {
			//要添加东西当然要先放入光标了，这里会记住之前的光标位置，所以直接focus即可
			obj.focus();
			cursorIndex = getFocus(obj);
			var text = obj.value;
			//文本中关键字以中括号包裹的形式显示
			var textNode = text.substring(0, cursorIndex) + '【' + e.target.innerHTML + '】' + text.substring(cursorIndex, text.length);
			allKeyWords.push(e.target.innerHTML);
			obj.value = textNode;
			//添加完之后我们要刷新光标位置
			cursorIndex = cursorIndex + e.target.innerHTML.length + 2;
			obj.selectionStart = cursorIndex;
			obj.selectionEnd = cursorIndex;

		} else if (e.target.tagName == "TEXTAREA" && e.target.getAttribute('isFocus')) {
			//点击文本区域操作
			cursorIndex = getFocus(obj);
		} else {
			//点击其他地方要将光标位置置空，防止点击关键字添加
			cursorIndex = null;
			console.log(1);
		}
	}
});

//最后我们处理提交模板的内容

var oBtn = document.querySelectorAll('button')[0];
oBtn.addEventListener('click', function(){
	//模板名称
	var templatetypename = document.querySelector('[data-type="templateName"]').value||"";
	//模板原始内容
	var templatename = obj.value||"";
	var reg = /\【([^\【\】]+)\】/g;
	var res;
	//我们把模板做一次变更，方便后端识别，模板关键字变为这种形式：[*]
	var templateformula = templatename.replace(reg,'[*]')||"";
	var keywords=[];
	//取出所有的关键字id，这里的顺序与模板内容的关键字一一对应
	for(var i=0;i<allKeyWords.length;i++){
		keywords.push(keyWordsJson[allKeyWords[i]]);
	}
	
	console.log(templatetypename,templatename,templateformula,keywords);
},false)