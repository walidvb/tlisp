const routes = {
    api: {
        links: {
            explore: '/api/links.json',
            me: '/api/links.json?custom=only-me',
            filters: '/api/filters.json',
            formDetails: url => `/api/link_form_details.json?url=${encodeURIComponent(url)}`,
            create: '/api/links.json',
        },
    },
    links: {
        new: '/tracks/new',
    }
}

export default routes