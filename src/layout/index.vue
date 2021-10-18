<template>
  <div class="app-wrapper"> 
    <el-container>
      <!-- 左侧导航 -->
      <Sidebar />
      <!-- 右侧 -->
      <el-container>
        <!-- 右侧头部 -->
        <el-header>
          <Header />
        </el-header>
        <!-- 右侧主体 -->
        <Main />
      </el-container>
    </el-container>
  </div>
</template>

<script>
// （5）这个页面跟登录页面的出口，都是App.vue里的<router-view />
// 这个页面引入了侧边栏，点击每一项，会改变路由地址，那么在本组件中一定要有路由的出口，而这个路由出口在main.vue中
import {Sidebar, Header, Main} from './components'

export default {
  name:'login',
  data(){
    return {
    }
  },
  methods:{
    goBack(){
      this.$router.push('/login');
    }
  },
  components:{
    Sidebar,
    Header,
    Main
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    height:100%;
  }
</style>