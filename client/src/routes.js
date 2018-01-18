const routes = {
    api: {
        links: {
            explore: '/api/links.json',
            me: '/api/links.json?custom=only-me',
            filters: '/api/filters.json',
            formDetails: url => `/api/link_form_details.json?url=${encodeURIComponent(url)}`,
            create: '/api/links.json',
            play: (id) => `/api/links/${id}/plays`
        },
        playlists: {
            index: '/api/playlists.json',
        },
        users: '/api/users.json',
        notifications: {
            index: '/api/notifications.json',
            open: (id) => `/api/notifications/${id}/open`,
        }
    },
    links: {
        new: '/tracks/new',
        me: '/me',
        explore: '/explore'
    },
    playlists: {
        show: '/playlists',
    }
}

export default routes