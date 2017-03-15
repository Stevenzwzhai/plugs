/**
 * Created by Stevenzwzhai on 2017/3/8.
 */
//实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")//输出:
	//Hi! This is Hank!
LazyMan("Hank").sleep(10).eat("dinner")//输出
//Hi! This is Hank!
//等待10秒..
//Wake up after 10
//Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")//输出
//Hi This is Hank!
//Eat dinner~
//Eat supper~

LazyMan("Hank").sleepFirst(5).eat("supper")//输出
//等待5秒
//Wake up after 5
//Hi This is Hank!
//Eat supper

//这是一个典型的流程控制，我们需要按照条件把事件注册到队列中，然后再执行，执行下一个事件通过next来控制
//然后要实现链式调用


function lazyMan(name){
	this.events = [];
	var self = this;
	var fn = (function(name){
		//这里使用闭包来保证能正确输出
		return function(){
			console.log("Hi! This is "+name+"!");
			self.next();
		}
	})(name)
	this.events.push(fn);
	//在下一次eventLoop中启动,这里是事件队列开始执行的启动点
	setTimeout(function(){
		self.next();
	}, 0);
}

lazyMan.prototype = {
	//next执行事件
	next: function(){
		var self = this;
		//事件执行按照先进先出方式
		var fn = self.events.shift();
		fn&&fn();
	},
	sleep: function(time){
		if(isNaN(time)){
			throw new Error(time+" 必须是数字");
		}
		var self = this;
		var fn = (function(time){
			return function(){
				var timer = setTimeout(function(){
					console.log("Wake up after "+time+"s");
					self.next();
				}, time*1000)
			}
		})(time)
		self.events.push(fn);
		return self;// 实现链式调用
	},
	sleepFirst: function(time){
		if(isNaN(time)){
			throw new Error(time+" 必须是数字");
		}
		var self = this;
		var fn = (function(time){
			return function(){
				var timer = setTimeout(function(){
					console.log("Wake up after "+time+"s");
					self.next();
				}, time*1000)
			}
		})(time)
		self.events.unshift(fn);
		return self;
	},
	eat: function(name) {
		var self = this;
		var fn =(function(name){
			return function(){
				console.log("Eat " + name + "~");
				self.next()
			}
		})(name);
		self.events.push(fn);
		return self;
	}
}

function LazyMan(name){
	return new lazyMan(name);
}
