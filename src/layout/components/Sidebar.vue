<template>
  <div :class="{'hasLog':hasLogo}">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- default-active要跟el-menu-item 里的index设置的相对应才能高亮-->
        <el-menu
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="yellow"
        mode="vertical"
        :collapse="isCollapse"
        :collapse-transition="false"
        >
        <SiderItem v-for="item in routes" :key="item.path" :item="item" :base-path="item.path"/>
     </el-menu>    
    </el-scrollbar>
  </div>
</template>

<script>
import {routes} from '@/router/index.js'
import SiderItem from './siderItem'
import {mapState,mapGetters} from 'vuex'
export default {
  components: {
    SiderItem
   },
 name:'Sidebar',
 data() {
     return {
         hasLogo:true,
         routes,
     }
 },
 computed:{
    ...mapState({
      sidebar: state => state.app.sidebar,
    }),
    isCollapse() {
      return !this.sidebar.opened;
    },
    activeMenu(){
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
 },
 methods: {
   //展开
   handleOpen(){

   },
   //收起
   handleClose(){
     
   }
 },
}
</script>

<style>

</style>