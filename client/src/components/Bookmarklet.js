import React, { PureComponent } from 'react';

import request from '../request';
import routes from '../routes';

export default function Bookmarklet(props){
    const domain = window.location.host;
    const bookmarklet = ` \
        var div = document.createElement('div'); \
        var overflow = document.body.style.overflow; \
        document.body.style.overflow = 'hidden'; \
        window.DDCloseIframe = function(){ \
          div.remove(); \
          document.body.overflow = overflow; \
        }; \
        div.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content:center;flex-direction: column;z-index:10000; font-size: 16px;' \
        var iframe = document.createElement('iframe'); \
        var iframeContainer = document.createElement('div'); \
        iframeContainer.style.position = 'relative'; \
        var close = document.createElement('div'); \
        close.innerText = '╳'; \
        close.style.cssText = 'color: white;position: absolute;cursor: pointer;right: 15px;top: 15px;' \
        iframeContainer.append(close); \
        close.addEventListener('click',DDCloseIframe); \
        iframe.frameBorder = 'none' \
        iframe.style.cssText = 'max-width: 100%; min-width: 900px; height: 80vh; z-index: 10000'; \
        iframe.src = '${domain}/tracks/new?modal=true&version=0.1&url='+encodeURIComponent(window.location) \
        iframeContainer.append(iframe); \
        div.append(iframeContainer); \
        document.body.append(div);`

    return (
        <div style={{padding: "5px"}}>
            <h2>We're all set</h2>
            <h1>Welcome to Diggers'Delights!</h1>
            <p>
                You just joined
        <em>the alphas</em>
            </p>
            <b>To get started:</b>
            <p>
                Drag the following button to your bookmarks toolbar
        <br />
                <a className="btn btn-large btn-primary" href="javascript:(function()%7B%0A%20%20%20%20%20%20%20%20var%20div%20=%20document.createElement('div');%0A%20%20%20%20%20%20%20%20var%20overflow%20=%20document.body.style.overflow;%0A%20%20%20%20%20%20%20%20document.body.style.overflow%20=%20'hidden';%0A%20%20%20%20%20%20%20%20window.DDCloseIframe%20=%20function()%7B%0A%20%20%20%20%20%20%20%20%20%20div.remove();%0A%20%20%20%20%20%20%20%20%20%20document.body.overflow%20=%20overflow;%0A%20%20%20%20%20%20%20%20%7D;%0A%20%20%20%20%20%20%20%20div.style.cssText%20=%20%22position:%20fixed;%20top:%200;%20left:%200;%20width:%20100vw;%20height:%20100vh;%20background:%20rgba(0,0,0,.5);%20display:%20flex;%20align-items:%20center;%20justify-content:center;flex-direction:%20column;z-index:10000;%20font-size:%2016px;%22%0A%20%20%20%20%20%20%20%20var%20iframe%20=%20document.createElement('iframe');%0A%20%20%20%20%20%20%20%20var%20iframeContainer%20=%20document.createElement('div');%0A%20%20%20%20%20%20%20%20iframeContainer.style.position%20=%20'relative';%0A%20%20%20%20%20%20%20%20var%20close%20=%20document.createElement('div');%0A%20%20%20%20%20%20%20%20close.innerText%20=%20%22%E2%95%B3%22;%0A%20%20%20%20%20%20%20%20close.style.cssText%20=%20%22color:%20white;position:%20absolute;cursor:%20pointer;right:%2015px;top:%2015px;%22%0A%20%20%20%20%20%20%20%20iframeContainer.append(close);%0A%20%20%20%20%20%20%20%20close.addEventListener('click',DDCloseIframe);%0A%20%20%20%20%20%20%20%20iframe.frameBorder%20=%20'none'%0A%20%20%20%20%20%20%20%20iframe.style.cssText%20=%20%22max-width:%20100%25;%20min-width:%20900px;%20height:%2080vh;%20z-index:%2010000%22;%0A%20%20%20%20%20%20%20%20iframe.src%20=%20%22//localhost:3000/tracks/new?modal=true&version=0.1&url=%22+encodeURIComponent(window.location)%0A%20%20%20%20%20%20%20%20iframeContainer.append(iframe);%0A%20%20%20%20%20%20%20%20div.append(iframeContainer);%0A%20%20%20%20%20%20%20%20document.body.append(div);%0A%0A%0A%20%20%20%20%20%20%7D)();" title="DiggersDelights me">Dig</a>
            </p>
            <p>
                On any page, click the bookmarklet. You may fill the tags in, the genre, and add a short description
    </p>
            <p>Currently supported services:</p>
            <ul>
                <li>Soundcloud</li>
                <li>Bandcamp</li>
                <li>Youtube</li>
                <li>Mixcloud</li>
                <li>
                    Any other listed
        <a target="_blank" href="https://oembed.com/#section7.1" data-external="true">here</a>
                </li>
            </ul>
        </div>
    );
}