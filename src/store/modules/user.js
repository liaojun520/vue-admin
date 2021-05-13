import Cookies from 'js-cookie'
import { getToken, setToken, removeToken } from '@/utils/auth'


const state = {
 token: getToken() || null
};
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
        if(token){ //有token
           setToken(token)  //设置token缓存
        }
    },
};
const actions = {
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', null)
            removeToken()  //清空token
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