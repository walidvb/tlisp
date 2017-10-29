(() => {
    let addScript = (path) => {
        var s = document.createElement('script');
        s.setAttribute('src', path);
        document.body.appendChild(s);
        console.log(path + " loaded");
    };
    let addStyleSheet = (path) => {
        var s = document.createElement('link');
        s.setAttribute('url', path);
        document.body.appendChild(s);
        console.log(path + " loaded");
    };
    if(!window.jQuery){
        addScript('//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js')
    }
    //addScript('https://tsilp.herokuapp.com/static/modaljs');
    addScript('//localhost:3000/static/modaljs');
})();