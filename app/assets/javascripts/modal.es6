$(document).ready((() => {

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

    let openModal = () => {
        $.ajax({
            url: 'http://localhost:3000/links/new?modal=true',
            success: (res) => {
                console.log(res);
            }
        });
    }
    $('#action').click(openModal);
    
}));