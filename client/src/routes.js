const routes = {
    api: {
        cliques: '/api/cliques',
        covers: '/api/covers',
        links: {
            explore: '/api/links.json',
            filters: '/api/filters.json',
            formDetails: url => `/api/link_form_details.json?url=${encodeURIComponent(url)}`,
            create: '/api/links.json',
            play: (id) => `/api/links/${id}/plays`
        },
        newsletter: {
            create: '/api/newsletters',
        },
        playlists: {
            index: '/api/playlists.json',
        },
        users: {
            index: '/api/users.json',
            me: '/api/me.json',
            signIn: '/users/sign_in',
            signUp: '/users',
            update: '/users',
            forgotPassword: '/users/password.json',
        },
        notifications: {
            index: '/api/notifications.json',
            open: (id) => `/api/notifications/${id}/open.json`,
        }
    },
    links: {
        new: '/tracks/new',
        me: '/me',
        explore: '/explore'
    },
    newsletter: '/keep-me-posted',
    playlists: {
        show: '/playlists',
    },
    user: {
        signup: '/cliques/:clique_slug/join',
        signin: '/login',
        forgotPassword: '/forgot-password',
    },
}

export default routes;