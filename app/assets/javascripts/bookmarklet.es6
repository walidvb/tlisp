
function httpGet(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
var url = __DIGGERS_DELIGHT_DOMAIN__+'/static/modaljs?ref='+location.href;
httpGet(url, function(res){
    var div = document.createElement('div');
    div.innerHTML = res;
    var scripts = div.children;
    for (var i = 0; i < scripts.length; i++) {
        var element = scripts[i];
        var script = document.createElement('script');
        script.src = element.src;
        document.body.appendChild(script);
    }
    console.log(div);
});