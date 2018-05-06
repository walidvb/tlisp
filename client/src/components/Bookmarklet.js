import React, { PureComponent } from 'react';

import { request, routes } from '../request';

import styles from './Bookmarklet.scss';

const drag = require('../assets/images/drag_button.gif');
const dig = require('../assets/images/dig_it.gif');
function dontShow(evt){
    evt.target.remove();
    localStorage.setItem('dont-show-help-on-startup', true)
}

export default function Bookmarklet(props){
    const domain = window.location.host;
    
    // TODO: close an iframe within an iframe
    // https://stackoverflow.com/a/43030280/1312825
    const bookmarklet = ` \
            var div = document.createElement('div'); \
            var overflow = document.body.style.overflow; \
            document.body.style.overflow = 'hidden'; \
            window.DDCloseIframe = function(){ \
                div.remove(); \
                document.body.style.overflow = overflow; \
            }; \
            div.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content:center;flex-direction: column;z-index:10000; font-size: 16px;'; \
            var iframe = document.createElement('iframe'); \
            var iframeContainer = document.createElement('div'); \
            iframeContainer.style.position = 'relative'; \
            var close = document.createElement('div'); \
            close.innerText = '╳'; \
            close.style.cssText = 'color: white;position: absolute;cursor: pointer;right: 15px;top: 15px;'; \
            iframeContainer.append(close); \
            close.addEventListener('click',DDCloseIframe); \
            iframe.frameBorder = 'none'; \
            iframe.style.cssText = 'width: 900px; max-width: 90vw; height: 80vh; z-index: 10000'; \
            iframe.src = '//${domain}/tracks/new?modal=true&version=0.1&url='+encodeURIComponent(window.location); \
            iframeContainer.append(iframe); \
            div.append(iframeContainer); \
            document.body.append(div);`;
    
    return (
        <div style={{padding: "15px 5px", textAlign: "center"}}>
            <h1 style={{marginBottom: "3rem", fontSize: 'larger'}}>Get started!</h1>
            <p style={{ marginBottom: "2rem" }}>
                <span className={styles.counter}>1.</span> <span>Drag the button to your bookmarks bar</span>
                <br />
                <a style={{ marginTop: "2rem" }} className="btn btn-large btn-primary" href={`javascript:(function(){${encodeURIComponent(bookmarklet)}})();`} title="DiggersDelights me">Dig</a>
            </p>
            <img src={drag} />
            <p style={{ marginTop: "3rem", marginBottom: "2rem" }}>
                <span className={styles.counter}>2.</span> <span>Click the button to share a link to your cliques!</span>
            </p>
            <img src={dig} />
            { props.showHelpOnStartup ? <div onClick={dontShow} className={styles.dont_show}> <input type="checkbox" />Don't show on startup </div> : null}
        </div>
    );
}