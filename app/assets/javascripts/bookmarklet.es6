(function() {
    let addScript = (path) => {
        var s = document.createElement('script');
        s.setAttribute('src', path);
        document.body.appendChild(s);
        console.log(path + " loaded");
    };
    if(!window.jQuery){
        addScript('//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js')
    }
    addScript('//__TSILP_DOMAIN__/static/modaljs?ref='+location.href);
})();