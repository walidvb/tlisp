let $this = $(document);
let openModal = () => {
    $.ajax({
        // __TSILP_DOMAIN__ is replaced inline in modaljs.html
        url: '//'+__TSILP_DOMAIN__+'/links/new?modal=true',
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
    $(document).on('click', '#plis .modal__close', closeModal);

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
    $(document).on('submit', '#plis form', handleSubmit);
};


let handleSubmit = (evt) => {
    evt.preventDefault();
    const $this = $(evt.target);
    const data = $this.serialize();
    const url = $this.attr('action');
    $('#plist').remove();
    $.ajax({
        url, data,
        method: 'POST',
        dataType: 'json',
        success: (res, status) => {
            console.log('submitted!', res);
            closeModal();
        }
    });
};
function closeModal() {
    $('#plis').removeClass('open').remove();
};