(() => {

    let $this = $(document);
    let openModal = () => {
        $.ajax({
            url: '//localhost:3000/links/new?modal=true',
            success: (res) => {
                console.log('Fetched modal');
                $(res).appendTo($('body'));
                bindModal($(res));
            }
        });
    }
    let bindModal = (res) =>{
        let container = $(res);
        $('.modal__close').on('click', container, () => $('#plis').removeClass('open'))
    }
    openModal();
    
})();