import Vue from 'vue'
import App from './App.vue'
import router from './router'  //引入router store 先后顺序有区别的
import store from './store'
import Cookies from 'js-cookie'
import './permission'


/**element-ui组件库 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI,{
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

/**全局公共样式 */
import '@/style/index.scss'

/**icon */
import '@/icons/index.js'

//处理异常  vue-router.esm.js?8c4f:2065 Uncaught (in promise) Error: Navigation cancelled from "/login?redirect=%2Fhome" to "/home" with a new navigation.
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import XLSX from 'xlsx'
Vue.prototype.$XLSX = XLSX





Vue.config.productionTip = false

 const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


export default vue