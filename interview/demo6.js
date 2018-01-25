// 将身份证年月日转化为 *
//  例如：
//  430682197905200825
//  430682********0825
let str = '430682197905200825';

// function rep(str){
//     return str.slice(6)+'*'.repeat(8)+str.slice(-4);
// }

function rep(str){
    return str.replace(/^(\d{6})\d+(\d{4})$/, ($1, $2, $3)=> $2+'*'.repeat(8)+$3)
}
console.log(rep(str))

