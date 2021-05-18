<template>
  <div class="app-main">
    <p>动态路由权限：登录成功根据后台返回的路由配置数据，前端拼接转换成真实路由配置</p>
    <p>真实路由配置不支持本地缓存，import引入内部结构会出问题</p>
    <p>动态路由添加方法：router.addRoute(item)   //vue-router4.0特有，一次只能add一个 （vue-router3.0是addRouters(数组)) </p>
    <p>重点：<sapn style="color:red;">router.beforeEach每次路由切换一次，就调用一次，一定要保证router.addRoute()只执行一次，不能重复添加</sapn></p>
    <p>动态路由存放在vuex最合适不过,每次页面刷新重新执行一次，跟router.addRoute()一致</p>
    <p>动态路由404重定向应拼接在最后面：let arr = [...routers,{ path: '*', redirect: '/404', hidden: true }]</p>
    <p>解决动态路由点击跳转正常跳转 刷新空白的问题： next({...to,replace:true})</p>
    <p>每次退出登录，清空挂载的动态路由 清空动态路由vuex数据</p>
    清空动态路由的方法：
    解决动态添加路由 一直提示警告 路由存在相同的name  addRoute只负责帮你添加 并未删除（在退出登录的时候调用，退出登录，清空路由vuex数据,清空动态路由）
    export function resetRouter() {
      const newRouter = createRouter()
      router.matcher = newRouter.matcher // reset router
    }
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>