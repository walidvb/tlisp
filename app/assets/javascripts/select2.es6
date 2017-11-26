$(document).on('ready', () => {
    $('.select2').each(function(){
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
});