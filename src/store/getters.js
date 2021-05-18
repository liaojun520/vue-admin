const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    menu:state => state.route.menu,
};

export default getters

