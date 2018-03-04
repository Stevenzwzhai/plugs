/*
*['1', '2','1-1','1-2' ,'2-2','2-1']输出如下格式，最多只有二级
* 1
* |...1-1
* |...1-2
* 2
* |...2-1
* |...2-2
*/
let arr = ['1', '2','1-1','1-2' ,'2-2','2-1']

function re(arr){
    let level1 = [], level2 = [];
    arr.forEach(item => {
        if(item.split('-').length==1){
            level1.push(item)
        }else{
            level2.push(item);
        }
    })
    level1.sort();
    level2.sort();
    level1.forEach(item => {
        console.log(item);
        level2.filter(citem => citem[0] == item).forEach(child => {
            console.log('|...'+child)
        })
    })
}

re(arr)