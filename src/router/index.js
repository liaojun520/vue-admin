import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'
/**
 * 【meta对象 && 含有children个数】 用于区分是否是单菜单路由 
 *  parent 不携带 meta  children个数为1 单菜单路由
 *  parent 携带 meta  children个数为1  或者 children个数大于1  多菜单路由
 *  无children视为非菜单路由
 */
export const routes = [
  {
    path: '/login',
    component: () => import('@/components/login/index'),
    name: 'login',
    hidden:true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/test'),
        name: 'index',
        meta: { title: '测试', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/test1',
    component: Layout,
    meta: { title: '测试', icon: 'home', affix: true },
    children: [
      {
        path: 'index1',
        component: () => import('@/views/home/index'),
        name: 'index1',
        meta: { title: '测试1', affix: true }
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    meta: {
      title: 'demo',
      icon: 'smile'
    },
    children: [
      {
        path: 'd1',
        component: () => import('@/views/home/index'),
        name: 'demo1',
        meta: { title: 'demo1', noCache: true, icon: 'smile'},
        // hidden:true
        children:[
          {
            path: 'c1',
            component: () => import('@/views/home/index'),
            name: 'c1',
            meta: { title: 'c1', noCache: true },
          }
        ]
      },
      {
        path: 'd2',
        component: () => import('@/views/home/index'),
        name: 'demo2',
        meta: { title: 'demo2', noCache: true }
      },
    ]
  },
  {
    path: '/demo3',
    component: Layout,
    meta: {
      title: 'demo3',
      icon: 'smile'
    }
  },
  {
    path: '/check_login',
    component: Layout,
    name:'check_login',
    children:[
      {
        path:'check_login_api',
        meta: {
          title: '测试登录失效',
          icon: 'smile',
        },
        name:'check_login_api',
        component: () => import('@/views/check_login/index'),
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
