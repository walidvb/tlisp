
console.log('opening modal');
let $this = $(document);
let openModal = () => {
    $.ajax({
        // __TSILP_DOMAIN__ is replaced inline in modaljs.html
        url: '//__TSILP_DOMAIN__/links/new?modal=true',
        success: (res) => {
            console.log('Fetched modal');
            const container = $(res);
            container.appendTo($('body'));
            bindModal(container);
            preFillForm(container);
        }
    });
};
openModal();

let preFillForm = (container) => {
    console.log(container)
    container.find('[name="link[url]"]').val(location.href);
};
let bindModal = (container) => {
    $('.modal__close').on('click', container, closeModal);
    $('form').on('submit', container, handleSubmit);
};


let handleSubmit = (evt) => {
    //evt.preventDefault();
    //$(this).submit( () => closeModal);
};
function closeModal() {
    $('#plis').removeClass('open');
};

