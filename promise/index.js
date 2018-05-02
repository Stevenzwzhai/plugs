function PromiseA(fn){
    this.status = 'pending'
    this.resolveData = "";
    this.rejectData = "";
    var self = this;
    this.errorList = [];

    return new PromiseA(function(resolve, reject) {
        try{
            fn(this.resolve, this.reject)
        }catch(error) {
            self.errorList.unshift(error);
        }
    })
}

PromiseA.prototype.then = function(successFn, failFn){
    if(this.status === "resolved"){
        successFn(this.resolveData)
    }else if(this.status === "rejected"){
        failFn(this.rejectData)
    }
}
PromiseA.prototype.catch = function(fn){
    fn(this.errorList.pop()[0])
}

PromiseA.prototype.resolve = function(data) {
    this.status = 'resolved';
    this.resolveData = data;
}
PromiseA.prototype.reject = function(data) {
    this.status = 'rejected';
    this.rejectData = data;
}