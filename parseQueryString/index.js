/**
 * Created by Stevenzwzhai on 2017/2/5.
 */

(function(){
    var url = window.location;
    var search  = url.search;
    var query = {};
    var searchArr = search.slice(1, search.length).split('&');
    for(var i = 0;i<searchArr.length;i++){
        var tempArr = searchArr[i].split('=');
        if(typeof query[tempArr[0]] == "undefined"){
            query[tempArr[0]] = tempArr[1];
        }
    }
    return {
        href : url.protocol,
        protocol : url.protocol,
        host : url.host,
        port : url.port,
        pathname : url.pathname,
        origin : url.origin,
        hostname : url.hostname,
        hash : url.hash,
        query : query
    }
})()
