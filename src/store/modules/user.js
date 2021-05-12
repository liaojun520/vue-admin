import Cookies from 'js-cookie'
import { getToken, setToken, removeToken } from '@/utils/auth'
/**
 * 
 */


const state = {
 token: getToken() || null
};
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
        setToken(token)
    },
};
const actions = {
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken() 
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