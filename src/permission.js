import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条 npm i nprogress --save
import 'nprogress/nprogress.css' // 进度条 style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

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
