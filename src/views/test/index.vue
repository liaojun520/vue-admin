<template>
    <div class="app-main"> 
        <h5>test页面</h5>
    </div>
</template>

<script>
import {router_menu} from '@/ajax/routes'
import {getToken} from '@/utils/auth'
export default {
name:'test',
mounted() {
  this.router_menu()
},
methods: {
   router_menu(){
       router_menu({token:getToken()}).then(res=>{
        console.log(res)
       })
   } 
},
}
</script>

<style>

</style>