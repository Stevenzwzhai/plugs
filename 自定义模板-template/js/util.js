
	//处理删除关键字
	function dealFocusL(obj,index,allKeyWords){
		var text = obj.value.slice(0,index);
		var resL,resR,i=0,j=0;
		var lastIndex=0;
		var regL = /\【/g;
		var regR = /\】/g;
		while(resL=regL.exec(text)){
			i++;
			//获取左中括号位置
			lastIndex = regL.lastIndex;
		}
		while(resR=regR.exec(text)){
			j++;
		}
		if(i!=j){
			var textAll = obj.value;
			obj.value = textAll.substring(0, lastIndex-1)+ textAll.substring(index, textAll.length);
			allKeyWords.splice(i-1,1);
		}
				
	}
	//delete关键字
	function dealFocusR(obj,index,allKeyWords){
		var text = obj.value.slice(index,obj.value.length);
		text = text.split('').reverse().join('');
		var resL,resR,i=0,j=0;
		var lastIndex = 0;
		var regL = /\【/g;
		var regR = /\】/g;
		while(resL=regL.exec(text)){
			i++;
		}
		while(resR=regR.exec(text)){
			j++;
			lastIndex = regR.lastIndex;
		}
		if(i!=j){
			//获取右中括号位置
			var textAll = obj.value;
			lastIndex = index+text.length-lastIndex+1;
			allKeyWords.splice(j-1,1);
			obj.value = textAll.substring(0, index)+ textAll.substring(lastIndex, textAll.length);
		}
	}
	//处理光标上下左右移动
	function dealFocusMove(obj,index){
		var text = obj.value.slice(0,index);
		var resL,resR,i=0,j=0;
		var lastIndex=0;
		var _lastIndex=0;
		var regL = /\【/g;
		var regR = /\】/g;
		while(resL=regL.exec(text)){
			i++;
			lastIndex = regL.lastIndex;
		}
		while(resR=regR.exec(text)){
			j++;
		}
		if(i!=j){
			if(index==lastIndex){
				var rightText = regR.exec(obj.value.slice(index, obj.value.length));
				_lastIndex = rightText['index'];
				index = _lastIndex+index+1;
			}else{
				index = lastIndex-1;
			}
			obj.selectionStart = index;
			obj.selectionEnd = index;
		}
	}
	//处理鼠标定位光标
	function dealFocusExtend(obj,index){
		var text = obj.value.slice(0,index);
		var resL,resR,i=0,j=0;
		var lastIndex=0;
		var regL = /\【/g;
		var regR = /\】/g;
		while(resL=regL.exec(text)){
			i++;
			lastIndex = regL.lastIndex;
		}
		while(resR=regR.exec(text)){
			j++;
		}
		if(i!=j){
			index = obj.value.length;
			obj.selectionStart = index;
			obj.selectionEnd = index;
		}
	}
	//获取光标位置
	function getFocus(elem) {
		var index = 0;
		if (document.selection) { // IE Support 
			elem.focus();
			var Sel = document.selection.createRange();
			if (elem.nodeName === 'TEXTAREA') { //textarea 
				var Sel2 = Sel.duplicate();
				Sel2.moveToElementText(elem);
				var index = -1;
				while (Sel2.inRange(Sel)) {
					Sel2.moveStart('character');
					index++;
				};
			} else if (elem.nodeName === 'INPUT') { // input 
				Sel.moveStart('character', -elem.value.length);
				index = Sel.text.length;
			}
		} else if (elem.selectionStart || elem.selectionStart == '0') { // Firefox support
			index = elem.selectionStart;
		}
		return (index);
	}

	