<template>
  <div class="navbar" :style="{width:width}">
      <!-- 收起按钮 -->
    <div class="navbutton" @click="toggleClick">
        <svg-icon class="navbutton" :class="{'navActive':!sidebar.opened}" class-name="navbutton-icon" icon-class="navbutton" />
    </div>
    <!-- 导航条 -->
    <navbarList/> |
    <!-- 导航历史记录 -->
    <navLink/>
    <logOut/>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import logOut from './logOut'
import navbarList from '@/components/navbar_list'
import navLink from '@/components/nav_link'
export default {
 name:'Navbar',
 components:{
 logOut,
 navbarList,
 navLink
 },
 data() {
     return {
        

     }
 },
 computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      mobile:state =>state.app.mobile
    }),
    width(){
      if(this.mobile){
       return '100%'
      }
      if(this.sidebar.opened){
        return 'calc(100% - 210px)'
      } 
      return 'calc(100% - 56px)'
    }
 },
 methods: {
     toggleClick(){
      this.$store.dispatch('app/toggleSideBar');
     }
 },
}
</script>

<style lang="scss" scoped>
.navbar{
    position:fixed;
    display: flex;
    align-items: center;
    // 100%不靠谱，都超出了
    // width:100%;
    height:50px;
    z-index:999;
    border-bottom: 1px solid #e6e6e6;
    background-color:#ffffff;
    // justify-content: space-between;
    box-sizing: border-box;
    transition:all 0s;
    .navbutton{
        position: relative;
        width:30px;
        transition: all .4s;
        & .navActive{
            transform: rotateY(180deg);
        }
    }

}

</style>