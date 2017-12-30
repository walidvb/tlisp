const routes = {
    api: {
        links: {
            index: '/api/links.json',
            filters: '/api/filters.json',
            oembed: url => `/api/oembed.json?url=${encodeURIComponent(url)}`,
        },
    },
    links: {
        new: '/tracks/new',
    }
}

export default routes