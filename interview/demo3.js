//实现bind方法
// Function.bind = Function.bind || function(obj){
//     return function(){
//         this.apply(obj, arguments)
//     }
// }

// function Person(){
//     this.name = 'Person';
//     this.getName = function(){
//         console.log(this.name)
//     }
// }

// var p1 = new Person();

// function cat(){
//     this.name = 'cat'
// }

// var newCat = p1.getName.bind(cat)
// console.log(typeof newCat)
// newCat()

class A {
    constructor(name){
        this.name = name;
        console.log(new.target, 'A')
    }
    static getName(){
        console.log('c')
    }
    getName() {
        console.log(12)
    }
    get age(){
        return 24;
    }
}
class B extends A{
    constructor(name){
        super(name);
        console.log(1, super.getName())
        console.log(2, super.age)
        console.log(new.target, 'B')
    }
    getName(){
        console.log(14);
    }
}
new B();
// new B('b').getName();