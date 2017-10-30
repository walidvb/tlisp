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

    const embedContainer = $('#embed');
    let setMedia = (oEmbed) => {
        embedContainer.html(oEmbed.html)
    };

    $(document).on('click', '.play', (evt) => {
        const infos = $(evt.target).parents('[data-url]').data();
        console.log(infos);
        setMedia(infos);
    });
});