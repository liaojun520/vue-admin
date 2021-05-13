<template>
  <div>
      <el-dropdown class="avatar" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon icon-class="user" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script>
import {removeToken} from '@/utils/auth'
export default {
name:'logOut',
methods: {
  logout(){
     //清空所有缓存
     sessionStorage.clear();
     removeToken(); //清空token信息
    //  window.location.reload();   //全局路由守卫会重定向   next(`/login?redirect=${to.path}`)
    // 退出登陆不需要重定向
    this.$router.push('/login');
  }
},
}
</script>

<style lang="scss" scoped>
.avatar{
position:fixed;
  right:20px;
  top:0px;
  z-index:1111;
  .avatar-wrapper{
   display: flex;
   align-items:center;
  }
}
.user-avatar{
    width: 50px!important;
    height:50px!important;
    vertical-align: middle;
}
</style>