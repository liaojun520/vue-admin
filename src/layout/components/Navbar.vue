<template>
  <div class="navbar">
      <!-- 收起按钮 -->
    <div class="navbutton" @click="toggleClick">
        <svg-icon class="navbutton" :class="{'navActive':!sidebar.opened}" class-name="navbutton-icon" icon-class="navbutton" />
    </div>
    <!-- 导航条 -->
    <navbarList/>
    <logOut/>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import logOut from './logOut'
import navbarList from '@/components/navbar_list'
export default {
 name:'Navbar',
 components:{
 logOut,
 navbarList
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
    width:100%;
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