/**
 * Created by twhp on 2017/2/20 0020.
 */
function add(){
    var newArr = Array.prototype.reduce.call(arguments, function(a,b){
        return a+b;
    });
    console.log(newArr);
}
add(1,2,3);