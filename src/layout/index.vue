<template>
  <div class="app-wrapper" :class="cssObj">
     <!--当是mobile时展示遮罩层 遮罩层 -->
     <div v-if="sidebar.opened && cssObj.mobile" class="drawer-bg" @click="handleClickOutside"></div>
     <!-- 左侧菜单栏 -->
     <Sidebar class="sidebar-container" />
     <!-- 右侧内容 -->
     <div class="main-container">
       <!-- 右上导航条 -->
       <Navbar class="navbar-container"/>
       <!-- 主体内容 -->
       <div class="app-content">
         <router-view :key="key" />
       </div>
     </div>
  </div>
</template>

<script>
import {Sidebar,Navbar} from './components'
import { mapState } from 'vuex'
export default {
 name:'layout',
 components:{
  Sidebar,
  [Navbar.name]:Navbar,
  
 },
 data() {
   return {
     key:this.$route.path
   }
 },
 computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      mobile:state =>state.app.mobile
    }),
    cssObj(){ //样式集合 sidebar.scss
      return{
        withoutAnimation:this.sidebar.withoutAnimation,
        hideSidebar: !this.sidebar.opened,
        mobile:this.mobile
      }
    }
 },
 mounted() {
  
 },
 methods: {
   handleClickOutside(){
    this.$store.dispatch('app/closeSideBar',{withoutAnimation:false})
   }
 },
}
</script>

<style lang="scss" scoped>
 @import "~@/style/mixin.scss";
    .app-wrapper{
      position: relative;
      width: 100%;
      height:100%;
      @include clearfix;
      .drawer-bg{
        background: #000;
        opacity: 0.1;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 1000;
      }
    }
   

</style>