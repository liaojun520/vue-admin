const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    menu:state => state.route.menu,
    routes:state => state.route.routes
};

export default getters

