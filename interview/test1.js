var str = 'asdfasdflkajdlbalbldsfas'
function findStr(str){
    var strObj = {}

    var maxObj = {
        count: 1,
        key: ''
    }
    var strMaxLen = Math.ceil(str.length/2);
    for(let i = 0; i<str.length-1;i++){
        let j = 2;
        let tIndex = i+j
        for(j; j<strMaxLen, (i+j)<str.length+1; j++){
            tIndex = i+j
            if(strObj[str.slice(i, tIndex)]){
                strObj[str.slice(i, tIndex)]++;
            }else{
                strObj[str.slice(i, tIndex)] = 1;
            }
            if(maxObj.count < strObj[str.slice(i, tIndex)] || (maxObj.count == strObj[str.slice(i, tIndex)] && maxObj.key.length < (j-i+1))){
                maxObj = {
                    count: strObj[str.slice(i, tIndex)],
                    key: str.slice(i, tIndex)
                }
            }
        }
        j = maxObj.key.length;
    }
    console.log(maxObj)
}
findStr(str)

//毒药问题
先枚举，一个老鼠可以试验出一个瓶子，两个老鼠可以试验出各自一瓶加上共同试验一瓶。以此类推，每只老鼠可以测验他自己的一瓶以及跟其他每个老鼠一起测验的瓶数，得到n个老鼠可以试验出n+C_n^2，根据排列组合就是，n+n*(n-1)>=100,得出n为10。查了下网上最低是7，应该是我这种排列会有重复
