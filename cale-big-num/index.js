//都是正数或者负数
function add(num1, num2){
    let arrA = (num1+'').split('');
    let arrB = (num2+'').split('');
    let longArr = arrA.length >= arrB.length ? arrA.reverse() : arrB.reverse();
    let shortArr = arrA.length < arrB.length ? arrA.reverse() : arrB.reverse();
    let result = [];
    let temp = 0;
    longArr.forEach((a, ia) => {
        temp = Number(a) + (shortArr[ia] ? Number(shortArr[ia]) : 0);
        temp+='';
        result[ia] ? result.push(...(Number(result.pop())+Number(temp)+'').split('').reverse()) : result.push(...temp.split('').reverse())
    })
    return result.reverse().join('');
}

function reduce(num1, num2){
    let arrA = (num1+'').split('');
    let arrB = (num2+'').split('');
    let longArr = arrA.length >= arrB.length ? arrA.reverse() : arrB.reverse();
    let shortArr = arrA.length < arrB.length ? arrA.reverse() : arrB.reverse();
    let result = longArr.slice();
    result.forEach((a, ia) => {
        if(shortArr[ia]){
            if(Number(a) > shortArr[ia]){
                result[ia] = Number(a) - Number(shortArr[ia]);
            }else{
                for(var i = ia+1;i<result.length;i++){
                    if(result[i] > 0){
                        temp = Math.pow(10, i-ia)-Number(shortArr[ia])+'';
                        temp = temp.length < (i-ia+1) ? '0'.repeat(1)+temp : temp;
                        result.splice(ia, i+1, ...(temp).split('').reverse());
                    }
                }

                
            }
        }
        
        
    })
    return result.reverse().join('');
}

function addS(num1, num2){
    if((num1>=0 && num2>=0) || (num1<0 && num2<0)){
        return num1 >= 0 ? add(num1, num2) : -add(Math.abs(num1), Math.abs(num2))
    }else{
        if(num1>0){
            if(Math.abs(num1) > Math.abs(num2)){
                return reduce(Math.abs(num1), Math.abs(num2))
            }else{
                return -reduce(Math.abs(num1), Math.abs(num2))
            }
        }else{
            if(Math.abs(num1) > Math.abs(num2)){
                return -reduce(Math.abs(num1), Math.abs(num2))
            }else{
                return reduce(Math.abs(num1), Math.abs(num2))
            }
        }
        
    }
}

console.log(addS(-1, 25))