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
