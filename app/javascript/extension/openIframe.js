import { routes } from '../frontend/request';

const openIframe = (src, params) => {
  const query = Object.keys(params).map(k => `${k}=${encodeURIComponent(params[k])}`)
  const src_ = `${routes.baseURL}/${src}?${query}`
  window.open(src_, 'shareWindow', 'height=700, width=850, top=' + Math.max(window.outerHeight / 2 - 325, 0) + ', left=' + Math.max(window.outerWidth / 2 - 425, 0) + ', toolbar=0, location=0, menubar=no, directories=0, scrollbars=0');
}

export default openIframe