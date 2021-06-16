import Cookies from 'js-cookie'
import { setRouter, getRouter, removeRouter } from '@/utils/auth'
import { router_menu } from '@/ajax/routes'
import {routes} from '@/router'

const state = {
    router: getRouter() || null, //请求的动态路由菜单数据
    menu:[],  //动态路由
    routes   //静态路由
};
const mutations = {
    GET_ROUTE: (state, data) => {
        if (data) { //有数据
            state.router = data
            setRouter(data)  //设置缓存
            return
        }
        state.router = null
        removeRouter()
    },
    GET_MENU:(state, data)=>{
       state.menu = data
    }
};

const actions = {
    getRoute({ commit }, data) {
        return new Promise(resolve => {
            router_menu({token:data}).then(res => {
                if (res.code == '0') {
                    let list = res.data
                    resolve(list) //小知识回顾：relsolve后面的代码还会执行哦  return比较保险
                    commit('GET_ROUTE',list)
                    return
                }
                resolve([]) 
                commit('GET_ROUTE')
            }).catch(_=>{
                resolve([]) 
                commit('GET_ROUTE')
            })
        })
    },

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}