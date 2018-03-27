//jsonp简单实现
function jsonp(url, cbKey, cbName, options) {
    let scriptObj = document.createElement('script')
    let params = ""
    if (options && options.toString() === '[object Object]' && Object.keys(options).length) {
        Object.keys(options).forEach(key => `&${params}${key}=${options.key}`)
    }
    scriptObj.src = `${url}?${cbKey}=${cbName+params}`;
    document.body.appendChild(scriptObj);

    scriptObj.onload = function() {
        document.body.removeChild(scriptObj)
    }
}