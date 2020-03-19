import { request, routes } from '../request';

export default function trackPlay({ id }){
    request(`${routes.api.links.play(id)}`, { method: 'POST' })
    .then(console.log)
}