$(document).ready(() => {
    // window.player = LMPlayer({}, true);
    

    // let tracks = $('[data-play]').toArray();
    // const playlistElements = tracks.map( (elem, i) => {
    //     const url = $(elem).data('url');
    //     return {
    //         url,
    //         DOMId: `track__${i}`,
    //     }
    // });
    // player.init(playlistElements);

    let setMedia = (oEmbed) => {
        $('#embed').html(oEmbed.html)
    };

    $(document).on('click', '.link', (evt) => {
        if($(evt.target).is('a')){ return true; }
        var row =  $(evt.target).parents('[data-url]');
        $('.playing').removeClass('playing');
        row.addClass('playing')
        const infos = row.data();
        // $('#embed').html(oEmbed.html)
        row.find('.item__infos').replaceWith($(infos.html));
    });
});