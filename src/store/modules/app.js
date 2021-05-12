import Cookies from 'js-cookie'


/**
 * 控制layout组件
 * 
 * ###1：sidebar：左侧菜单栏 
 * opened:控制 左侧菜单栏是否向右收缩，全局遮罩层是否展示 
 * withoutAnimation 是否有transform 动画
 */


const state = {
    sidebar:{
      opened :Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true, // !! 转Boonlean的简写
      withoutAnimation :false
    },
    size: Cookies.get('size') || 'medium',
    mobile:document.body.clientWidth<1024 ? true : false
};
const mutations = {
  CLOSE_SIDEBAR:(state,param)=>{
    Cookies.set('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = param;
  },
  TOGGLE_SIDEBAR:(state)=>{
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
    }
  }
};
const actions = {
  closeSideBar({commit},{withoutAnimation}){
    commit('CLOSE_SIDEBAR',withoutAnimation);
  },
  toggleSideBar({ commit }){
    commit('TOGGLE_SIDEBAR');
  }

};

export default{
    namespaced: true,
    state,
    mutations,
    actions 
}