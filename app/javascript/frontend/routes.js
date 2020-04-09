const baseURL = /diggersdelights\.net/.test(window.location.href) ? '' : 'https://diggersdelights.herokuapp.com'
// const baseURL = 'http://localhost:3000'
const routes = {
    web: {
        user: {
            signin: `${baseURL}/users/sign_in`,
        },
    },
    api: {
        curatedPlaylists: {
            index: `${baseURL}/api/curated_lists`,
            show: `${baseURL}/api/curated_lists`,
        },
        cliques: `${baseURL}/api/cliques`,
        covers: `${baseURL}/api/covers`,
        links: {
            explore: `${baseURL}/api/links.json`,
            myLinks: `${baseURL}/api/links/my_links.json`,
            filters: `${baseURL}/api/filters.json`,
            formDetails: url => `/api/link_form_details.json?url=${encodeURIComponent(url)}`,
            create: `${baseURL}/api/links.json`,
            play: (id) => `${baseURL}/api/links/${id}/plays`,
            like: (url) => `${baseURL}/api/links/like/toggle?url=${encodeURIComponent(url)}`
        },
        newsletter: {
            create: `${baseURL}/api/newsletters`,
        },
        playlists: {
            index: `${baseURL}/api/playlists.json`,
        },
        users: {
            index: `${baseURL}/api/users.json`,
            me: `${baseURL}/api/me.json`,
            signIn: `${baseURL}/users/sign_in`,
            signUp: `${baseURL}/users`,
            update: `${baseURL}/users`,
            forgotPassword: `${baseURL}/users/password.json`,
        },
        notifications: {
            index: `${baseURL}/api/notifications.json`,
            open: (id) => `/api/notifications/${id}/open.json`,
        }
    },
    links: {
        new: `/tracks/new`,
        me: `/me`,
        explore: `/explore`,
    },
    newsletter: `/`,
    playlists: {
        show: `/playlists`,
    },
    curatedList: {
        show: `/curated`,
    },
    user: {
        signup: `/cliques/:clique_slug/join`,
        signin: `/login`,
        forgotPassword: `/forgot-password`,
    },
    baseURL,
}

export default routes;