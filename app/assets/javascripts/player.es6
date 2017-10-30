/**
 * =================================
 * youtube & soundcloud apis wrapper
 * =================================
 *
 * dependency : jquery
 *
 * Object LMPlayer({
 *              string appendIframesTo = 'body'
 *          },boolean debug = false)
 *
 *
 *
 * #How to use
 *
 * 1. instantiate new object from LMPlayer
 *  var lmp = new LMPlayer();
 *
 * 2. initiate the object with an array of playlist elements ,
 * a playlist element should have a youtube or soundcloud url (url) and a unique string (DOMId)
 *
 * lmp.init([
 *      {url : string , DOMId : string },
 *      ...
 *      ...
 * ]);
 *
 * #Available methods
 *
 * lmp.play()
 *
 * lmp.play(DOMId) or lmp.play(playlistItemPosition)
 *
 * lmp.pause()
 *
 * lmp.playNext()
 *
 * lmp.playPrev()
 *
 * lmp.setPlaylistElements()
 *
 * lmp.getPlaylistElements()
 *
 * lmp.setVolume(1-100)
 *
 * lmp.seekTo(0%-100%)
 *
 * lmp.reset()
 *
 * lmp.currentTrack()
 *
 * lmp.currentIndex()
 *
 * lmp.playerStatus()
 *
 * #Properties
 *
 * LMPlayer.Events
 *
 * LMPlayer.Status
 *
 *
 *
 *
 * #Events
 *
 * Events.Ready
 * Events.Reset
 * Events.Paused
 * Events.Playing
 * Events.Loading
 * Events.Ended
 * Events.Progress
 * Events.Seeking
 * Events.Info
 * Events.Broken
 * Events.Error
 * Events.Next
 * Events.Prev
 * Events.Last
 * Events.First
 *
 *
 *
 */


//(function ($) {
    
        String.prototype.urlParams = function(name){
            var str = this.toString();
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(str);
            if(results){
                return results[1];
            }
        };
    
        (function($){
            $.loadScript = function(src,successCallback,errorCallback){
                var sTag = $('<script>')[0];
                sTag.src = src;
                sTag.onload = successCallback;
                sTag.onerror = errorCallback;
                $('body:first')[0].appendChild(sTag);
            };
        })(jQuery);
    
        var lmPlayer = function (opts,dbg) {
            var w = window;
            var debug = (typeof dbg == 'undefined' ? false : dbg);
            var _namespace_ = 'lamixtape';
            var PLAYER_STATUS = {
                PLAYING : 0,
                PAUSED : 1,
                ENDED : 2,
                WAITING : 3,
                BROKEN : 4
    
            };
            var PROVIDER_STATUS = {
                READY: 0,
                BUSY: 1,
                PENDING: 2,
                INITING: 3,
                ERROR: 4,
                PLAYING:5,
                PAUSED:6,
                ENDED:7
            };
            var Events = {
                Ready: _namespace_ + '_ready',
                Reset: _namespace_ + '_reset',
                Paused: _namespace_ + '_paused',
                Playing: _namespace_ + '_playing',
                Loading: _namespace_ + '_loading',
                Ended: _namespace_ + '_ended',
                Progress: _namespace_ + '_progress',
                Seeking: _namespace_ + '_seeking',
                Info: _namespace_ + '_info',
                Broken: _namespace_ + '_broken',
                Error: _namespace_ + '_error',
                Next: _namespace_ + '_next',
                Prev: _namespace_ + '_prev',
                Last: _namespace_ + '_last',
                First: _namespace_ + '_first'
            };
    
    
            var inited = false;
    
            var providers = {
                yt: {
                    status: PROVIDER_STATUS.PENDING,
                    inited: false,
                    progressIntervalHandler: undefined,
                    uniqueId: 'yt_player'
                },
                sc: {
                    status: PROVIDER_STATUS.PENDING,
                    inited: false,
                    forcePlayIntervalHandler: undefined,
                    onload: undefined
                }
            };
            var YTPlayer = {};
            var SCPlayer = {};
            var playlistElements = [];
            var currentIndex;
            var currentTrack = {};
            var me;
            var playerStatus = PLAYER_STATUS.WAITING;
            var options = {
                appendIframesTo : 'body'
            };
    
            $.extend(options,opts);
    
    
            var getIndex = function (index) {
                if(!isNaN(index)){
                    index = parseInt(index);
                }
                if((typeof index).toLowerCase() == 'string'){
                    for(var i= 0,c=playlistElements.length;i<c;++i){
                        if(playlistElements[i].DOMId == index){
                            return i;
                        }
                    }
                    return undefined;
                }
    
                return index;
    
    
            };
    
    
            var isReady = function () {
                if(!inited){
                    return false;
                }
                for(var i in providers){
                    if(providers[i].status == PROVIDER_STATUS.PENDING){
                        return false;
                    }
                }
    
                return true;
            };
    
            var _triggerEvent = function (eventName,data) {
                if(debug){ console.log(eventName, data) }
                data = data || {};
                data.track = data.track || currentTrack || {};
                data.playerStatus = playerStatus;
                data.provider = data.track.provider || undefined;
                data.currentIndex = currentIndex;
                $(me).trigger(eventName,[data]);
            };
    
    
    
            /**
             * set playlist DOM elements
             */
            var _setPlaylistElements = function (elements) {
                reset(function () {
                    for (var i = 0; i < elements.length; i++) {
                        var element = elements[i];
                        console.log(element, element.url, element);
                        if(typeof element.url == 'undefined' || typeof element.DOMId == 'undefined'){
                            _triggerEvent(Events.Error,{type:'missing_url_or_DOMId_property'});
                            return false;
                        }
                        element.broken = false;
                    }
                    currentIndex = -1;
                    playlistElements = elements;
                });
    
            };
    
            /**
             * reset all
             */
            var reset = function (callback) {
                var _reset = function () {
                    playerStatus = PLAYER_STATUS.WAITING;
                    currentIndex = undefined;
                    currentTrack = {};
                    playlistElements = [];
                    if($.isFunction(callback)){
                        callback();
                    }
                    _triggerEvent(Events.Reset);
                };
                if(playlistElements.length==0){
                    _reset();
                }else{
                    if(playerStatus == PLAYER_STATUS.PLAYING){
                        $(me).on(Events.Paused+'.reset', function (e, d) {
                            _reset();
                            $(me).off(Events.Paused+'.reset');
                        });
                        _pause();
                    }else{
                        _reset();
                    }
    
                }
    
            };
    
            /**
             * get track details
             * @param index
             * @returns {*}
             */
    
            var getTrackDetails = function (index,returnAnyways) {
                index = (typeof index != 'undefined' ? getIndex(index) : currentIndex);
                var provider = 'unknown';
                if(typeof playlistElements[index] == 'undefined'){
                    return false;
                }
                var url = playlistElements[index].url;
    
    
                url = url.split('#')[0];
                url = $.trim(url);
    
                if(url == '' && !returnAnyways){
                    return false;
                }
    
                if(/youtube\.com/i.test(url)){
                    provider = 'youtube';
                }else if(/soundcloud\.com/i.test(url)){
                    provider = 'soundcloud';
                }
    
    
                return $.extend({"index":index,"url":url,"provider":provider},playlistElements[index]);
    
            };
    
    
    
            var _playNext = function (force) {
                if (!isReady()) {
                    _triggerEvent(Events.Error,{type:'player_not_ready'});
                    return false;
                }
                if(playlistElements.length==0){
                    _triggerEvent(Events.Error,{type:'empty_playlist'});
                    return false;
                }
                ++currentIndex;
                if(playlistElements.length<=currentIndex){
                    currentIndex = 0;
                    _triggerEvent(Events.Last);
                    if(force){
                        _play(currentIndex);
                    }
                }else{
                    _triggerEvent(Events.Next,{nextTrack:(getTrackDetails(currentIndex))});
                    _play(currentIndex);
                }
            };
            var _playPrev = function (force) {
                if (!isReady()) {
                    _triggerEvent(Events.Error,{type:'player_not_ready'});
                    return false;
                }
                if(playlistElements.length==0){
                    _triggerEvent(Events.Error,{type:'empty_playlist'});
                    return false;
                }
                --currentIndex;
                if(currentIndex<0){
                    currentIndex = (playlistElements.length-1);
                    _triggerEvent(Events.First);
                    if(force){
                        _play(currentIndex);
                    }
                }else{
                    _triggerEvent(Events.Prev,{prevTrack:(getTrackDetails(currentIndex))});
                    _play(currentIndex);
    
                }
            };
    
    
            var _play = function (index) {
                currentIndex = (typeof index != 'undefined' ? getIndex(index) : currentIndex);
    
                if (!isReady()) {
                    _triggerEvent(Events.Error,{type:'player_not_ready'});
                    return false;
                }
    
                if(playlistElements.length==0){
                    _triggerEvent(Events.Error,{type:'empty_playlist'});
                    return false;
                }
    
    
                var track = getTrackDetails(currentIndex);
    
    
    
    
                if(playerStatus == PLAYER_STATUS.PLAYING &&
                    currentTrack.index == currentIndex){
                    _triggerEvent(Events.Error,{type:'this_track_is_being_played_now'});
                    return false;
                }
    
                switch(track.provider){
                    case 'youtube':
                        SCPause(true);
                        YTPlay(track);
                        break;
                    case 'soundcloud':
                        YTPause(true);
                        SCPlay(track);
                        break;
                    default :
                        YTPause(true);
                        SCPause(true);
                        currentTrack = getTrackDetails(currentIndex,true);
                        _triggerEvent(Events.Loading,{loadingTrack:currentTrack});
                        _triggerEvent(Events.Error,{
                            type:'unknown_provider'
                        });
                        _triggerEvent(Events.Broken,{
                            type:'broken_track_unknown_provider'
                        });
                }
    
    
    
    
                return true;
    
            };
    
            var _pause = function () {
                if (!isReady()) {
                    _triggerEvent(Events.Error,{type:'player_not_ready'});
                    return false;
                }
    
                if(playerStatus == PLAYER_STATUS.PLAYING){
                    switch(currentTrack.provider){
                        case 'youtube':
                            YTPause();
                            break;
                        case 'soundcloud':
                            SCPause();
                            break;
                        default :
                            _triggerEvent(Events.Error,{type:'unknown_provider'});
                            _triggerEvent(Events.Broken,{type:'broken_track_unknown_provider'});
    
                    }
                }else{
                    _triggerEvent(Events.Error,{type:'nothing_to_pause'});
                }
    
                return true;
    
            };
    
            /**
             *
             * @param lvl from 0 - 100
             * @returns {boolean}
             * @private
             */
            var _setVolume = function (lvl) {
                if (!isReady()) {
                    _triggerEvent(Events.Error,{type:'player_not_ready'});
                    return false;
                }
    
                switch(currentTrack.provider){
                    case 'youtube':
                        YTPlayer.setVolume(lvl);
                        break;
                    case 'soundcloud':
                        SCPlayer.setVolume(lvl/100);
                        break;
                    default :
                        _triggerEvent(Events.Error,{type:'unknown_provider'});
                }
    
            };
            var _seekTo = function (relative) {
                if (!isReady()) {
                    _triggerEvent(Events.Error,{type:'player_not_ready'});
                    return false;
                }
    
                if(playerStatus == PLAYER_STATUS.PLAYING ||
                    playerStatus == PLAYER_STATUS.PAUSED){
                    switch(currentTrack.provider){
                        case 'youtube':
                            YTSeekTo(relative);
                            break;
                        case 'soundcloud':
                            SCSeekTo(relative);
                            break;
                        default :
                            _triggerEvent(Events.Error,{type:'unknown_provider'});
                    }
                }else{
                    _triggerEvent(Events.Error,{type:'nothing_to_seek_to'});
                }
    
    
    
    
            };
    
    
            // youtube callbacks
    
            var YTSeekTo = function (relative) {
                var seconds = YTPlayer.getDuration() * (relative*1/100);
                if (typeof providers.yt.progressIntervalHandler != 'undefined') {
                    clearTimeout(providers.yt.progressIntervalHandler);
    
                };
                YTPlayer.seekTo(seconds,true);
            };
    
    
            var YTPlay = function (track) {
                track = track || currentTrack;
                if(!providers.yt.inited){
                    _triggerEvent(Events.Error,{type:'cannot_use_youtube_iframe_api_at_this_point'});
                    return false;
                }
    
    
                if(currentTrack.index !== track.index){
                    _triggerEvent(Events.Loading,{loadingTrack:track});
                    YTPlayer.loadVideoById(track.url.urlParams('v'));
    
                }
    
                if(track.broken){
                    _triggerEvent(Events.Error,{type:'youtube_broken_track'});
                    return false;
                }
                YTPlayer.playVideo();
    
                currentTrack = track;
    
                return true;
    
            };
    
            var YTPause = function (force) {
                if(!providers.yt.inited){
                    _triggerEvent(Events.Error,{type:'cannot_use_youtube_iframe_api_at_this_point'});
                    return false;
                }
    
    
    
    
                if(force || providers.yt.status == PROVIDER_STATUS.PLAYING){
                    YTPlayer.pauseVideo();
    
                }else{
                    _triggerEvent(Events.Error,{type:'youtube_nothing_to_pause'});
                }
    
                return true;
            };
    
            var ytPlayerStateChange = function (e) {
                if (e.data == w.YT.PlayerState.PLAYING) {
                    _triggerEvent(Events.Playing);
                    if(currentTrack.provider == 'youtube'){
                        currentTrack.duration = YTPlayer.getDuration();
                    }
                    providers.yt.status = PROVIDER_STATUS.PLAYING;
                    providers.yt.progressIntervalHandler = setInterval(function () {
                        if(currentTrack.provider != 'youtube'){
                            if (typeof providers.yt.progressIntervalHandler != 'undefined') {
                                clearInterval(providers.yt.progressIntervalHandler);
                            }
                            YTPlayer.pauseVideo();
                            providers.yt.status = PROVIDER_STATUS.PAUSED;
    
                        }else{
                            var currentProgress = (
                            YTPlayer.getCurrentTime() / (YTPlayer.getDuration() * 1 - 0.33)
                            );
                            _triggerEvent(Events.Progress, {progress: (currentProgress * 100)});
                            providers.yt.status = PROVIDER_STATUS.PLAYING;
    
                        }
                    }, 100);
    
                    return;
    
                } else if (e.data == w.YT.PlayerState.PAUSED) {
                    providers.yt.status = PROVIDER_STATUS.PAUSED;
                    _triggerEvent(Events.Paused,{origin:'YT.PlayerState.PAUSED'});
    
                } else if (e.data == w.YT.PlayerState.ENDED) {
                    providers.yt.status = PROVIDER_STATUS.ENDED;
                    _triggerEvent(Events.Ended);
                } else if (e.data == w.YT.PlayerState.CUED) {
                    _triggerEvent(Events.Info,{type:'youtube_CUED'});
                } else if (e.data == w.YT.PlayerState.BUFFERING) {
                    _triggerEvent(Events.Info,{type:'youtube_BUFFERING'});
                }
    
                if (typeof providers.yt.progressIntervalHandler != 'undefined') {
                    clearInterval(providers.yt.progressIntervalHandler);
                }
    
            };
    
            w.onYouTubePlayerAPIReady = function (data) {
                YTPlayer = new YT.Player(providers.yt.uniqueId, {
                    events: {
                        onReady: function () {
                            providers.yt.status = PROVIDER_STATUS.READY;
                            providers.yt.inited = true;
                            YTPlayer.setVolume(80);
                        },
                        onError: function () {
                            _triggerEvent(Events.Broken,{type:'youtube_error_playing_track'});
                        },
                        onStateChange: ytPlayerStateChange
                    }
                });
            };
    
            var initYTWidget = function () {
                if (providers.yt.inited) {
                    return;
                }
    
                providers.yt.status = PROVIDER_STATUS.INITING;
                providers.yt.uniqueId = 'yt_player_' + (Math.round(Math.random() * 100000000));
                var $playerHolder = $('<div>').attr('id', providers.yt.uniqueId);
                $(options.appendIframesTo+':first').append(
                    $('<div>').append($playerHolder).css('display', debug ? '': 'none')
                );
                $.loadScript('https://www.youtube.com/iframe_api',null,function () {
                    providers.yt.status = PROVIDER_STATUS.ERROR;
                    _triggerEvent(Events.Error,{type:'cannot_init_youtube_iframe_api'});
                });
            };
    
    
            //soundcloud events & callbacks
    
            var _scForcePlay = function(attempts,scb,ecb){
                attempts = attempts || 0;
                SCPlayer.play();
    
                if(attempts>=6){
    
                    if(providers.sc.status == PROVIDER_STATUS.PLAYING){
                        if($.isFunction(scb)){
                            scb();
    
                        }
                    }else{
                        if($.isFunction(ecb)){
                            ecb();
    
                        }
                    }
    
                    return;
                }
                providers.sc.forcePlayIntervalHandler = setTimeout(function () {
                    ++attempts;
                    _scForcePlay(attempts,scb,ecb)
                },2000);
    
            };
    
            var _scForcePause = function (attempts) {
                attempts = attempts || 0;
                if(_scForcePause >= 6){
                    return;
                }
    
                if(providers.sc.status != PROVIDER_STATUS.PAUSED){
                    SCPlayer.pause();
                    SCPlayer.isPaused(function (paused) {
                        if(!paused){
                            _scForcePause(++attempts)
                        }
                    });
    
                }
            };
            var SCPlay = function (track) {
                track = track || currentTrack;
                if(!providers.sc.inited){
                    _triggerEvent(Events.Error,{type:'cannot_use_soundcloud_widget_api_at_this_point'});
                    return false;
                }
    
    
    
                if(currentTrack.index !== track.index){
                    _triggerEvent(Events.Loading,{loadingTrack:track});
                    SCPlayer.load(track.url,{
                            show_artwork:false,
                            show_comments:false,
                            show_user:false,
                            sharing:false,
                            liking:false,
                            buying:false}
                    );
                    providers.sc.onload = function(){
                        _scForcePlay(0, null , function () {
                            _triggerEvent(Events.Broken,'soundcloud_too_many_failed_attempts')
    
                        });
                    };
                }else{
                    SCPlayer.play();
                }
    
                currentTrack = track;
    
    
    
    
                return true;
    
            };
    
            var SCPause = function (force) {
                if(!providers.sc.inited){
                    _triggerEvent(Events.Error,{type:'cannot_use_soundcloud_widget_api_at_this_point'});
                    return false;
                }
    
    
    
                if(force || providers.sc.status == PROVIDER_STATUS.PLAYING){
                    SCPlayer.pause();
    
                }else{
                    _triggerEvent(Events.Error,{type:'soundcloud_nothing_to_pause'});
                }
                return true;
            };
    
            var SCSeekTo = function (relative) {
                var milliseconds = currentTrack.duration * relative*1/100;
    
                SCPlayer.seekTo(milliseconds);
            };
    
            var initSCWidget = function () {
                if (providers.sc.inited) {
                    return;
                }
    
                providers.sc.status = PROVIDER_STATUS.INITING;
                $.loadScript('https://w.soundcloud.com/player/api.js',function () {
                    var $iframe = $('<iframe>').attr('src', 'https://w.soundcloud.com/player/?visual=true&url=https://soundcloud.com/soundeffectsforfree/record-scratch-sound-effect');
                    $iframe.on('load', function () {
                        initSCEvents(this);
                        if(typeof providers.sc.onload != 'undefined'){
                            if($.isFunction(providers.sc.onload)){
                                providers.sc.onload();
                            }
                        }
                    });
                    $(options.appendIframesTo+':first').append(
                        (!debug ?
                            $('<div>').append($iframe).css('display', 'none') :
                            $('<div>').append($iframe)
                        )
                    );
    
                },function () {
    
                    providers.sc.status = PROVIDER_STATUS.ERROR;
                    _triggerEvent(Events.Error,{type:'cannot_init_soundcloud_widget_api'});
                });
    
    
            };
    
            var initSCEvents = function (iframe) {
                if (providers.sc.inited) {
                    return;
                }
                SCPlayer = w.SC.Widget(iframe);
    
                SCPlayer.bind(SC.Widget.Events.READY, function () {
                    providers.sc.status = PROVIDER_STATUS.READY;
                    providers.sc.inited = true;
                    SCPlayer.setVolume(80);
                    _triggerEvent(Events.Info,{type:'soundcloud_ready'});
                });
    
                SCPlayer.bind(SC.Widget.Events.PAUSE , function () {
                    providers.sc.status = PROVIDER_STATUS.PAUSED;
                    _triggerEvent(Events.Paused,{origin:'SC.Widget.Events.PAUSE'});
                });
    
                SCPlayer.bind(SC.Widget.Events.PLAY, function () {
                    providers.sc.status = PROVIDER_STATUS.PLAYING;
                    if(typeof providers.sc.forcePlayIntervalHandler != 'undefined'){
                        clearTimeout(providers.sc.forcePlayIntervalHandler);
                    }
                    SCPlayer.getDuration(function (d) {
                        if(currentTrack.provider == 'soundcloud'){
                            currentTrack.duration = d;
                        }
                    });
    
                    _triggerEvent(Events.Playing);
                });
    
                SCPlayer.bind(SC.Widget.Events.SEEK , function () {
                    _triggerEvent(Events.Seeking);
                });
    
                SCPlayer.bind(SC.Widget.Events.ERROR, function (ev) {
                    if(typeof providers.sc.forcePlayIntervalHandler != 'undefined'){
                        clearTimeout(providers.sc.forcePlayIntervalHandler);
                    }
                    _triggerEvent(Events.Broken,{type:'soundcloud_error_playing_track'});
    
                });
    
                SCPlayer.bind(SC.Widget.Events.FINISH, function (e) {
                    _triggerEvent(Events.Ended);
    
                });
                SCPlayer.bind(SC.Widget.Events.LOAD_PROGRESS , function (e) {
                    _triggerEvent(Events.Info,{type:'soundcloud_LOAD_PROGRESS'});
    
    
                });
    
                SCPlayer.bind(SC.Widget.Events.PLAY_PROGRESS, function (e) {
                    if(currentTrack.provider != 'soundcloud'){
                        _scForcePause();
    
                    }else{
                        providers.sc.status = PROVIDER_STATUS.PLAYING;
                        _triggerEvent(Events.Progress, {progress: (e.relativePosition * 100)});
    
    
                    }
                });
    
                providers.sc.inited = true;
            };
    
            var logger = function () {
                if(!debug){return;}
                if (typeof console != 'undefined' && typeof console.log != 'undefined') {
                    console.log.apply(console, arguments);
                }
            };
    
            var _init = function (elements) {
                if (inited) {
                    return;
                }
                inited = true;
    
                if (typeof $ == 'undefined') {
                    return;
                }
    
                if(typeof elements !== 'undefined' && elements.length >0){
                    _setPlaylistElements(elements);
                }
    
    
                if(debug){
    
                    for(var i in LMPlayer.Events){
                        (function (event) {
                            $(me).on(event, function (e,d) {
                                logger(event,d);
                            })
                        })(LMPlayer.Events[i]);
    
                    }
    
    
                }
    
                initYTWidget();
                initSCWidget();
    
                $(me).on(Events.Playing, function (e, d) {
                    playerStatus = PLAYER_STATUS.PLAYING;
                    if(playlistElements[d.track.index].broken){
                        playlistElements[d.track.index].broken = false;
                    }
                }).on(Events.Paused,function(){
                    playerStatus = PLAYER_STATUS.PAUSED;
                }).on(Events.Ended,function(){
                    playerStatus = PLAYER_STATUS.ENDED;
                }).on(Events.Broken, function (e, d) {
                    playerStatus = PLAYER_STATUS.BROKEN;
                    if(typeof currentIndex == 'undefined'){
                        //currentIndex = 0;
                    }else{
                        playlistElements[d.track.index].broken = true;
                    }
                });
    
            };
    
    
    
            return {
                "init": function (elements) {
                    me = this;
                    _init(elements);
                },
                "play": _play,
                "playNext": _playNext,
                "playPrev": _playPrev,
                "pause": _pause,
                "setVolume": _setVolume,
                "seekTo": _seekTo,
                "getPlaylistElements" : function () {
                    return playlistElements;
                },
                "setPlaylistElements": _setPlaylistElements,
                "reset" : reset,
                "currentTrack" : function () {
                    return currentTrack;
                },
                "currentIndex" : function () {
                    return currentIndex;
                },
                "Events": Events,
                "playerStatus" : function () {
                    return  playerStatus;
                },
                "Status" : PLAYER_STATUS,
                "uniqueIdGenHelper" : function (unique,prefix,suffix) {
                    prefix = prefix || 'track';
                    suffix = suffix || '';
                    unique = unique || '';
    
                    return (prefix + unique +'_' + (Math.round(Math.random() * 100000000)) + suffix);
    
                }
            };
    
        };
    
    
        window.LMPlayer = function(options,debug){
            return lmPlayer(options,debug);
        };
        window.LMPlayer.Events = lmPlayer().Events;
        window.LMPlayer.Status = lmPlayer().Status;
    
    
    //})(jQuery);