import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条 style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  console.log(to, from, next,'路径')
  // start progress bar
  NProgress.start()

  // 设置浏览器标题
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      //可以处理动态路由挂载
      var reloaded = window.sessionStorage.getItem('reloaded') || ''; 
      if (reloaded == '' && to.name == 'documentation') {
        window.location.reload(); 
        window.sessionStorage.setItem('reloaded', 'yes');
        this.$nextTick(()=>{
          next()
        })
      }else{
        next()
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
