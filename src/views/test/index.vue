<template>
    <div class="app-main"> 
        <h5>test页面</h5>
        <el-button 
            type="success" 
            size="mini" 
            @click="$router.push({path:'/test/excel',query:{pageSize:1,pageNum:10}})"
        >
        excel.vue
        </el-button>
    </div>
</template>

<script>
import {router_menu} from '@/ajax/routes'
import {getToken} from '@/utils/auth'
export default {
name:'test',
mounted() {
//   this.router_menu()
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