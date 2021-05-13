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
            <span style="display:block;" @click="dialogFormVisible = true">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 修改密码弹框 -->
      <el-dialog  
      title="修改密码" 
      :visible.sync="dialogFormVisible" 
      :modal-append-to-body="false"
      >
        <el-form 
        :model="form" 
        v-loading="loading"
        ref="form"
        :rules="rules"
        >
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" auto-complete="off" style="width:90%;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldpassword">
            <el-input v-model="form.oldpassword"  style="width:90%;" clearable type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth" prop="newpassword">
            <el-input v-model="form.newpassword"  style="width:90%;" clearable type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitFUN('form')">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import {getToken,removeToken} from '@/utils/auth'
import {getInfo,change_password} from '@/ajax/user'
export default {
name:'logOut',
data() {
  const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不小于6位'))
      } else {
        callback()
      }
    }
  return {
    token:getToken() || null,
    dialogFormVisible: false,
    formLabelWidth:'70px',
    loading:true,
    form:{
      username:'',
      oldpassword:'',
      newpassword:''
    },
    rules: {
      oldpassword: [{ required: true, trigger: "blur",message:'必填'}],
      newpassword: [{ required: true, trigger: "blur",validator: validatePassword }],
    },
  }
},
watch:{
  dialogFormVisible(){
    if(this.dialogFormVisible){
      this.getInfoFUN()
    }
  }
},
methods: {
  logout(){
     //清空所有缓存
     sessionStorage.clear();
     removeToken(); //清空token信息
    //  window.location.reload();   //全局路由守卫会重定向   next(`/login?redirect=${to.path}`)
    // 退出登陆不需要重定向
    this.$router.push('/login');
  },
  commitFUN(form){
     this.$refs[form].validate((valid) => {
        if (valid) {
          let data = {...this.form,token:this.token}
          this.change_passwordFUN(data)
        }else{
          this.$message.error("请填写必填信息");
          return false;
        }
     })
  },
  //获取账号名
  getInfoFUN(){
    getInfo({token:this.token}).then(res=>{
      if(res.code=='0'){
        this.$set(this.form,'username',res.data);
      }
      this.loading = false
    }).catch(_=>{
      this.loading = false
    })
  },
  //修改密码
  async change_passwordFUN(data){
    try {
      let res = await change_password(data);
      if(res.code=='0'){
        this.$message.success(res.message)
        this.dialogFormVisible = false;
        //重新登录
        sessionStorage.clear();
        removeToken(); 
        window.location.reload();
      }
    } catch (error) {
      
    }
    
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
>>>.el-dialog__body{
  padding-top: 0!important;
  padding-bottom:0!important;
}
</style>