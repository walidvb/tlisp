import React, { PureComponent } from 'react';

import styles from './Bookmarklet.scss';

const drag = require('../assets/images/drag_button.gif');
const dig = require('../assets/images/dig_it.gif');
function dontShow(evt){
    evt.target.remove();
    localStorage.setItem('dont-show-help-on-startup', true)
}

const domain = window.location.host;
export default function Bookmarklet(props){
    if(/chrome/i.test(navigator.userAgent)){
        const extensionURL = "https://chrome.google.com/webstore/detail/diggersdelights/mfpedieakkfpjgaahkjiicmgnmhpbpop"
        return extension(extensionURL);
    }
    else{
        return bookmarklet(props);
    }
}

function extension(url){
    return <div style={{padding: '5px'}}>
         Want to add your tracks? 
         <br />
         Download the
         &nbsp;<a href={url} target="_blank">browser extension</a>
    </div>
}


function bookmarklet(props){
    // TODO: close an iframe within an iframe
    // https://stackoverflow.com/a/43030280/1312825
    const bookmarklet = ` \
        var src = 'http://www.diggersdelights.net/tracks/new?modal=true&version=0.1&url=' + encodeURIComponent(window.location); \
        window.open(src, 'shareWindow', 'height=700, width=850, top=' + Math.max(window.outerHeight / 2 - 325, 0) + ', left=' + Math.max(window.outerWidth / 2 - 425, 0) + ', toolbar=0, location=0, menubar=no, directories=0, scrollbars=0'); \
    `;

    return (
        <div style={{padding: "15px 5px", textAlign: "center"}}>
            <h1 style={{marginBottom: "3rem", fontSize: 'larger'}}>Get started!</h1>
            <p style={{ marginBottom: "2rem" }}>
                <span className={styles.counter}>1.</span> <span>Drag the button to your bookmarks bar</span>
                <br />
                <a style={{ marginTop: "2rem" }} className="btn btn-large btn-primary" href={`javascript:(function(){${encodeURIComponent(bookmarklet)}})();`} title="DiggersDelights me">Dig</a>
            </p>
            <img src={drag} alt={'drag example'}/>
            <p style={{ marginTop: "3rem", marginBottom: "2rem" }}>
                <span className={styles.counter}>2.</span> <span>Click the button to share a link to your cliques!</span>
            </p>
            <img src={dig} alt={'dig example'}/>
            { props.showHelpOnStartup ? <div onClick={dontShow} className={styles.dont_show}> <input type="checkbox" />Don't show on startup </div> : null}
        </div>
    );
}