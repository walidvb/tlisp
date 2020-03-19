import routes_ from './routes';
export const routes = routes_;

export function request(url, options = {}){
    const method = options.method || 'GET';
    const qs = options.qs == undefined ? "" : "?"+serialize(options.qs);
    if(options.body){
        options.body = JSON.stringify(options.body);
    }
    return new Promise((resolve, reject) => {
        fetch(`${url}${qs}`, {
            ...options,
            credentials: 'same-origin',
            headers: { "Content-Type": "application/json", accept: 'application/json', }
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return resolve(response.json())
            }
            else {
                response.text()
                .then(text => {
                    console.log(`Error fetching ${url}:`, response)
                    try {
                        const data = JSON.parse(text);
                        reject(data);
                    } catch (err) {
                        reject(text)
                    }
                });
            }
        })
        .catch((err) => reject(err));
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
            if(value)
            {
                return `${key}=${encodeURIComponent(value)}`;
            }
    });

    return [].concat.apply([], query).join('&');
}