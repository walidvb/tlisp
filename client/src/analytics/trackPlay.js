import request from '../request';
import routes from '../routes';

export default function trackPlay({ id }){
    request(`${routes.api.links.play(id)}`, { method: 'POST' })
    .then(console.log)
}