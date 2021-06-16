import router,{resetRouter} from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条 npm i nprogress --save
import 'nprogress/nprogress.css' // 进度条 style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/title'
import {getAsyncRoutes} from '@/utils/index'
import {getRouter} from '@/utils/auth'
import Layout from '@/layout'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // 不需要登录权限的页面






router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // 设置浏览器标题
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') { 
      //如果已经登录了，你再点浏览器回退键 回退到登录页 重定向到 /页面
      next({ path: '/' })
      NProgress.done()
    } else {
      //可以处理动态路由挂载
      /**
       * 重点！！！！: 每次路由切换 router.beforeEach()就执行！一定要杜绝动态路由router.addRoute()重复执行
       * 每次页面刷新,动态路由清空 vuex数据也清空 重新 挂载动态路由
       */
      let routers = store.state.route.menu || [] //获取动态路由
      if(!routers || routers.length==0){ //没路由时执行，确保 有动态路由数据时 router.addRoute只执行一次！！！
        try {
          let accessRoutes 
          //有请请求的动态路由数据缓存 就取缓存 没有 就 dispatch重新调用接口获取
          if(getRouter()){
            accessRoutes = getRouter()
          }else{
            accessRoutes = await store.dispatch('route/getRoute', hasToken)
          }
          // 转为真正的路由格式
          routers = getAsyncRoutes(accessRoutes)   //带引入() => import()组件不支持本地缓存，内部指向会出问题
          //把动态路由 合并到菜单sidebar
          store.commit('route/GET_MENU',routers)
          let arr = [...routers,{ path: '*', redirect: '/404', hidden: true }]
          arr.forEach(item=>{
            router.addRoute(item)   //vue-router4.0特有，一次只能add一个 （vue-router3.0是addRouters(数组))  
          })
          next({...to,replace:true}) //解决动态路由 刷新空白失效问题
        } catch (error) {
        }
      }
        next();
      NProgress.done()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {  // 不需要登录token权限的页面
      next()
    } else { 
      //前往其他页面 当token不存在时，定向到登录页 query参数记录当时要前往的页面
      // （在登录页处理query参数，登陆成功判断要前往的页面）
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
