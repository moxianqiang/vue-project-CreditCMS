<template>
  <el-aside width="200px" class="aside">
    <!-- 左侧导航 -->
    <el-menu :default-active="$route.path" exact class="el-menu-vertical-demo" router> 
      <!-- get_routes[0]是整个布局页面的路由配置数组，也就是constantRoutes去掉/和/login -->
      <sideItem v-for="v in get_routes[0].children" :key="v.path" :item="v" :path="v.path"/>
    </el-menu>
  </el-aside>
</template>

<script>
// （9）
import {mapGetters} from 'vuex'
import sideItem from './sideItem'
export default {
  name:'login',
  data(){
    return {
    }
  },
  computed:{
    // 进入到整个布局页时，会加载左侧导航栏，这时候就开始做权限匹配了。不同权限，展示不同的左侧
    // get_routes来源于 store/modules/permission.js
    // 由于本页面需要根据路由权限来展示导航栏，意味着整个布局组件加载前就应做完角色匹配，get_routes就是需要渲染的导航栏信息。
    // 那么如何自动触发完成角色匹配的功能呢？在src/permission.js里，对路由进行了拦截，当整个布局首页加载时，地址栏发生变化，就开始拦截判断。
    ...mapGetters(['get_routes'])   // （16）   get_routes拿到的路由配置项数组不包括 / 和 /login
  },
  components:{
    sideItem
  }
}
</script>

<style lang="scss" scoped>
  .aside {
    background:#304156;
    .el-menu {
      border-right: none;
      background-color: #304156;
      color:#fff;
    }
  }
</style>
