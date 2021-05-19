<template>
  <div style="margin-left:10px;">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <!-- 最后一项 或者noRedirect 不支持跳转 -->
          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <!-- 最后一项之前的 -->
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group> 
    </el-breadcrumb>
  </div>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'  //具体使用 https://www.cnblogs.com/Ewarm/p/12965069.html

export default {
name:'navbarList',
data() {
  return {
    levelList: null
  }
},
created() {
  this.getBreadcrumb()
},
watch: {
  $route(route) {
    // 如果转到重定向页面，不要更新面包屑
    if (route.path.startsWith('/redirect/')) {
      return
    }
    this.getBreadcrumb()
  }
},
methods: {
  getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isHome(first)) {
        matched = [{ path: '/home', meta: { title: 'home' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      // console.log(this.levelList)
    },
  //判断是否为首页
  isHome(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
    },
    handleLink(item){
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      //参数转换 例：path: '/user/:id/:name' params: id: 10001, name: 'bob' ==>/user/10001/bob
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
},
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__item{
  display: flex!important;
}
</style>