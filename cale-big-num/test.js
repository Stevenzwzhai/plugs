var a = new Promise(function(resolve, reject){
    setTimeout(() => {
        reject(1)
    })
})
a.catch(err => {
    console.log(err)
})
.then(() => {
    console.log(3)
}, () => {
    console.log(4)
})