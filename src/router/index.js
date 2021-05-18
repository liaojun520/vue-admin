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
        meta: { title: '首页', icon: 'home'}
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    meta: { title: '测试', icon: 'home'},
    children: [
      {
        path: 'excel',
        component: () => import('@/views/test/excel.vue'),
        name: 'test_excel',
        meta: { title: 'excel导出'}
      }
    ]
  },
  {
    path: '/test1',
    component: Layout,
    meta: { title: '测试1', icon: 'home'},
    children: [
      {
        path: 'index1',
        component: () => import('@/views/home/index'),
        name: 'index1',
        meta: { title: '测试1'}
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
        meta: { title: 'demo1', icon: 'smile'},
        // hidden:true
        children:[
          {
            path: 'c1',
            component: () => import('@/views/home/index'),
            name: 'c1',
            meta: { title: 'c1'},
          }
        ]
      },
      {
        path: 'd2',
        component: () => import('@/views/home/index'),
        name: 'demo2',
        meta: { title: 'demo2'}
      },
    ]
  },
  {
    path: '/Routing',
    component: Layout,
    name:'Routing',
    children:[
      {
        path: 'index',
        name:'Routing_index',
        meta: {
          title: '路由权限',
          icon: 'smile'
        },
        component:()=>import('@/views/Routing/index.vue')
      }
    ]
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
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!  若有动态挂载时，也必须放最后面
  // { path: '*', redirect: '/404', hidden: true }
  
]

export const asyncRoutes = []
// asyncRoutes   这种的是前端手动控制权限的，匹配后端返回的权限类型进行匹配，然后，在菜单合并，在dispatch回调中执行守卫控制【在菜单导航页面操作】
// created () {
//       this.$store.dispatch('route/getUserInfo').then(res=>{
//         console.log(res,'回调')
//         // 获取用户信息，根据用户信息递归调用，过滤符合的路由
           //再提交到vuex  this.$store.commit('route/getMenu',符合的路由数组)
           //在permission.js处理全局路由守卫
//    })
//   },

// //动态添加路由
// router.addRoutes(userRoutes)
// //最后添加重定向路由
// router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])



// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

//改造

const createRouter = ()=> new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,  //静态路由
  // 当切换到新路由时，可以修改页面滚动位置 ---只有history模式有效   
  scrollBehavior (to, from, savedPosition) {//scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }  //切换路由 页面滚到顶部
  }  
  // 详情请看 https://www.cnblogs.com/sophie_wang/p/7880261.html
})

const router = createRouter()

/**
 * 优化项目时，有个环节在主路由下，根据后端返回不同内容，需要修改动态路由。
 * 如果直接删除原来路由，再addrouter新路由，发现原来的路由还是存在的。vue动态新增路由，没有删除功能（vue官方文档好像没有提供）。
 */
// //解决动态添加路由 一直提示警告 路由存在相同的name  addRoute只负责帮你添加 并未删除（在退出登录的时候调用，退出登录，清空路由vuex数据,清空动态路由）
 export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


export default router
