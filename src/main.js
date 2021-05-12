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








Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
