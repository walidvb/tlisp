export default function(url, options = {}){
    console.log(serialize(options.qs), options.qs)
    const qs = options.qs == undefined ? "" : "?"+serialize(options.qs);
    return fetch(`${url}${qs}`, {
        ...options,
        credentials: 'same-origin', 
        accept: 'application/json', 
        headers: { "Content-Type": "application/json" }
    })
}

function serialize(params, prefix) {
    if(!params){
        return undefined;
    }
    const query = Object.keys(params).map((key) => {
        const value = params[key];

        if (params.constructor === Array)
            key = `${prefix}[]`;
        else if (params.constructor === Object)
            key = (prefix ? `${prefix}[${key}]` : key);

        if (typeof value === 'object')
            return serialize(value, key);
        else
            return `${key}=${encodeURIComponent(value)}`;
    });

    return [].concat.apply([], query).join('&');
}