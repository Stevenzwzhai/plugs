/**
 * Created by Stevenzwzhai on 2017/2/5.
 */
var url = window.location;
var href = url.protocol;
var protocol = url.protocol;
var host = url.host;
var port = url.port;
var pathname = url.pathname;
var origin = url.origin;
var hostname = url.hostname;
var search  = url.search;

var query = {};
var searchArr = search.slice(1, search.length).split('&');
for(var i = 0;i<searchArr.length;i++){
    var tempArr = searchArr[i].split('=');
    if(typeof query[tempArr[0]] == "undefined"){
        query[tempArr[0]] = tempArr[1];
    }
}
console.log(query);