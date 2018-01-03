export default function(url, options = {}){
    const method = options.method || 'GET';
    const qs = options.qs == undefined ? "" : "?"+serialize(options.qs);
    if(options.body){
        options.body = JSON.stringify(options.body);
    }
    return new Promise((resolve, reject) => {
        fetch(`${url}${qs}`, {
            ...options,
            credentials: 'same-origin',
            accept: 'application/json',
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return resolve(response.json())
            }
            else {
                console.log("Error: ", response)
                return response.json().then((err) => reject(err))
            }
        })
    })
    
}

// https://stackoverflow.com/a/42604801/1312825
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