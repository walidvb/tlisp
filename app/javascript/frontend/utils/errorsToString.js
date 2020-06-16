export default function(errors) {
    return Object.keys(errors).reduce((prev, val, i) => [prev, `${val} ${errors[val].join('')}`].filter(vv => vv).join(', '), '')
}