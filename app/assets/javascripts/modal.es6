let $this = $(document);
let openModal = () => {
    $.ajax({
        // __DIGGERS_DELIGHT_DOMAIN__ is replaced inline in modaljs.html
        url: __DIGGERS_DELIGHT_DOMAIN__+'/links/new?modal=true&auth_token='+__DIGGERS_DELIGHTS_USER_ID__,
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
    container.find('[name="link[url]"]').val(location.href);
};
let bindModal = (container) => {
    $(document).on('click', '#diggersdelights .modal__close', closeModal);

    $(container).find('.select2').each(function(){
        const $this =  $(this);
        const tags = $this.data('tags').split(',');
        $this.select2({
            tags: true,
            tokenSeparators: [','],
            data: tags,
            placeholder: $this.attr('placeholder'),
            width: '100%',
        });
    });
    $(document).on('submit', '#diggersdelights form', handleSubmit);
};


let handleSubmit = (evt) => {
    evt.preventDefault();
    const $this = $(evt.target);
    const data = $this.serialize() + "&auth_token="+__DIGGERS_DELIGHTS_USER_ID__;
    const url = $this.attr('action')+'.json';
    $.ajax({
        url, data,
        method: 'POST',
        dataType: 'json',
        // contentType: "text/json",       
        success: (res, status) => {
            console.log('submitted!', res);
            closeModal();
        }
    });
};
function closeModal() {
    $('#diggersdelights').removeClass('open').remove();
};