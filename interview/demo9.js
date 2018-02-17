/*
做一个每秒递减的函数
*/
function dreduce(){
    let count = 0;
    let sum = 60;
    let timer = setInterval(() => {
        if(count == 60){
            clearInterval(timer);
            return;
        }
        console.log(sum-count)
        count++;
    }, 1000)
}

function dreduce2(){
    let sum = 60;
    while(sum){
        ((sum) => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                console.log(sum);
            }, 1000*(60-sum))
        })(sum)
        sum--
    }
}
function dreduce3(){
    let sum = 60;
    while (sum) {
        let result = sum;
        let timer = setTimeout(() => {
            clearTimeout(timer);
            console.log(result);
        }, 1000 * (60 - result))
        sum--
    }
}
// dreduce();  
// dreduce2();
dreduce3();