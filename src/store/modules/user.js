import Cookies from 'js-cookie'
import { getToken, setToken, removeToken,removeAll } from '@/utils/auth'


const state = {
 token: getToken() || null
};
const mutations = {
    SET_TOKEN: (state, token) => {
        if(token){ //有token
           state.token = token
           setToken(token)  //设置token缓存
           return
        }
        state.token = null
        removeToken()  //清空token
        // removeAll()   //清空所有cookie
        sessionStorage.clear(); //清空可能存在的动态路由
    },
};
const actions = {
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN')
            resolve()
        })
    },
    
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}