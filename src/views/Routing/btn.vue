<template>
  <div class="app-main">
    <div>
      <el-radio v-model="radio" label="admin">admin权限</el-radio>
      <el-radio v-model="radio" label="user">user权限</el-radio>
    </div>
    <hr/>
    <div>
      <button v-has="admin" type="primary" >admin可看</button>&nbsp;&nbsp;
      <button v-has="user" >user可看</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'btn',
  data(){
    return{
      radio: sessionStorage.getItem('btnPermissions') || 'admin',
      admin:'admin',
      user:'user'
    }
  },
  watch:{
    radio(){
      sessionStorage.setItem('btnPermissions',this.radio)
      window.location.reload() //刷新才能生效
    }
  },
  methods: {
    
  },
}
</script>

<style>

</style>