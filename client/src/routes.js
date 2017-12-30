const routes = {
    api: {
        links: {
            index: '/api/links.json',
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