<template>
   <div>
         <div>
           <!-- 所有hidden为true的路由配置项不会走进去，所以不需要额外的任何判断!-->
          <div v-if="!item.hidden">
            <!-- 单菜单导航 -->
            <!-- 如果符合单菜单 直接可以走这里  多菜单先降维遍历，递归调用组件再走这里-->
            <template v-if="isOnlyMenu(item.children,item)">
              <Applink :to="resolvePath(onlyOneChild(item).path)">
                  <el-menu-item :index="resolvePath(onlyOneChild(item).path)" :class="{'submenu-title-noDropdown':!isNest}">
                      <template  v-if="onlyOneChild(item).meta"> 
                      <svg-icon v-if="onlyOneChild(item).meta.icon" class="svg-icon" :class="onlyOneChild(item).meta.icon+'-icon'" :icon-class="onlyOneChild(item).meta.icon" />
                      <span v-if="onlyOneChild(item).meta.title" slot="title">{{onlyOneChild(item).meta.title}}</span>
                      </template>
                  </el-menu-item>
              </Applink>
            </template>
            <!-- 多菜单导航 -->
             <el-submenu v-else :index="resolvePath(item.path)" class="el-submenu">
                <template slot="title" v-if="item.meta">
                  <svg-icon v-if="item.meta.icon" class="sub-svg-icon" :class="item.meta.icon+'-icon'" :icon-class="item.meta.icon" />
                  <span v-if="item.meta.title">{{item.meta.title}}</span>
                </template>
                <!-- 递归调用自己  跟自己申明的name属性一致-->
                <!-- 把多菜单遍历递归成单菜单 使用 -->
                 <siderItem
                  v-for="child in item.children"
                  :key="child.path"
                  :item="child"
                  :is-nest="true"
                  :base-path="resolvePath(child.path)"
                />
              </el-submenu>
          </div>
        </div>
   </div>
</template>

<script>
import Applink from './appLink'
import path from 'path'
import { isExternal } from '@/utils'
export default {
  name:'siderItem',
  components:{
      Applink,
  },
  data() {
    return {
      isNest:false
    }
  },
  props:{
      item:{
          type:Object,
          required:true
      },
      basePath:{
          type:String,
          required:true
      }
  },
  computed:{
      //跳转链接
      resolvePath() {
      return (routePath)=>{ //判断是不是https开头的，如果是，直接跳转 a标签 https链接
        if (isExternal(routePath)) {
            return routePath
        }
        if (isExternal(this.basePath)) {
            return this.basePath
        }
        // path.resolve() 方法
        return path.resolve(this.basePath, routePath) //路由拼接
      }
    },
    //判断是否是单菜单路由
    isOnlyMenu(){
      return (child = [],parent)=>{
        if(child.length===1){
          if(parent.meta && !parent.meta.noMoreMenu){
            return false;
          } 
          return true;
        }else if(child.length==0){
          return true;
        }  
        return false;
      }
    },
  },
  methods: {
    onlyOneChild(item){  //能走到这里说明都是符合单菜单路由规则
      try { //默认都认为是带children数组,数组长度为1  包裹的 单菜单路由配置项
          const value = item.children[0];
          return value
      } catch (error) {  //不带children的单菜单路由配置项
        return {...item,path:''}; //注意：当递归到最后一层时，没有children的，resolvePath() 最后默认拼接一段空路径
      }
    }
  },
}
</script>

<style>

</style>