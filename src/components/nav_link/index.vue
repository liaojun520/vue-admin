<template>
  <div class="navLink">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path:tag.path,query:tag.query}"
        @click="console.log(tag)"
        custom
        v-slot="{ navigate}"
        class="tags-view-item"
        v-show="isAffix(tag)" 
      >
      <!--点击事件 阻止事件冒泡 默认行为  -->
        <span @click="navigate">
          {{ tag.title }}
          <i  v-if="tag.path!='/home'"
            class="el-icon-close" 
            @click.prevent.stop="closeSelectedTag(tag)"
          >
          </i>
        </span>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import scrollPane from "./scroll-pane";
import { mapState,mapGetters } from "vuex";
import path from 'path'
export default {
  name: "navLink",
  components: {
    scrollPane,
  },
  computed: {
    ...mapState({
      visitedViews: (state) => state.tagsView.visitedViews,
    }),
    ...mapGetters([
      'routes'
    ])
  },
  watch: {
    $route:{
      handler(){
        this.addTags();
      },  
    } 
  },
  mounted() {
    this.initTags() //设置默认的历史导航
    this.addTags()  //防止刷新，当前导航历史不存在
  },
  methods: {
    handleScroll() {},
    //新增路由导航
    addTags() {
      const { name } = this.$route;
      if (name) {
        // console.log(this.$route,'this.$route')
        this.$store.dispatch("tagsView/addView", this.$route);
      }
    },
    // 选中
    isActive(route) {
      return route.path === this.$route.path;
    },
    // 判断是否需要展示路由导航    
     isAffix(tag) {
      return tag.meta && tag.meta.title  
    },
    //删除标签
    closeSelectedTag(view){
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {  //选中删除后的最后一个
        this.$router.push(latestView.fullPath)
      } else { // 如果删除了最后一个标签视图，默认是重定向到首页，
          this.$router.replace({ path:'/home'})
      }
    },
    //初始路由导航
    initTags() {
      const affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch("tagsView/addView", tag)
        }
      }
    },
    //转换
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
  },
};
</script>

<style lang="scss" scoped>
.navLink {
  margin-left: 10px;
  flex: 1;
  margin-right: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
   .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      max-width:200px;
      &:first-of-type {
        margin-left: 0px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
}
</style>