<template>
  <div class="app-main">
      <p>登录失效测试:</p>
      <p>原理：用户登录请求login接口，code==0登录成功，后台返回token信息作为标识，前端sessionStorage存下token </p>
      <p>前端把token信息封装在请求头  config.headers['token'] = token信息；之后界面的任何接口请求都携带该请求头token</p>
      <p>当请求项目某个接口时 后端校验登录状态 返回code 1010  作为登陆失效的标识,此时前端需要清空token缓存,以及请求头token 重定向到登录页 (在request.js处理)</p>
      <p>登录成功 再存token缓存 以及token信息封装在请求头 。。。</p>
      <el-button type="primary" @click="check_loginFun">测试一下</el-button>
  </div>
</template>

<script>
import {check_login} from '@/ajax/api'
export default {
name:'check_login',
mounted() {
//    this.check_loginFun(); 
},
methods: {
   check_loginFun(){
       check_login().then(res=>{
         console.log(res)
       }).catch( _ =>{

       })
   } 
},
}
</script>

<style>

</style>