export default function(url, options){
    return fetch(url, {
        ...options,
        credentials: 'same-origin', 
        accept: 'application/json', 
        headers: { "Content-Type": "application/json" }
    })
}