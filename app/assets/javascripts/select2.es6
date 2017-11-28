$(document).on('ready', () => {
    $('.select2').each(function(){
        const $this =  $(this);
        $this.select2({
            tags: true,
            tokenSeparators: [','],
            placeholder: $this.attr('placeholder'),
            width: '100%',
        });
    });
});