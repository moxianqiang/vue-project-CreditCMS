<template>
  <div class="app-breadcrumb">
    <el-breadcrumb separator="/">
      <!-- 面包屑 -->
      <el-breadcrumb-item v-for="(v,i) in list" :key="i">
        <!-- list这个数组，第一项是最外层的导航路由，依次类推。 -->
        <!-- 这里意思是，如果是最后一项，也就是当前页，不需要跳转，显示文本信息即可。如果不是最后一项，要能够点击到对应组件 -->
        <span v-if="i==list.length-1">{{v.meta.title}}</span>
        <router-link :to="v.path" v-else>{{v.meta.title}}</router-link>
      </el-breadcrumb-item>

      <!-- 退出下拉框 -->
      <div class="right-menu">
        <el-dropdown>
          <span class="el-dropdown-link">
            退出<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span style="display:block;" @click="goBack">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-breadcrumb>
  </div>
</template>

<script>
// （7）
import { logout } from '@/api/http'
import { removeToken } from '@/utils/token'

export default {
  name:'login',
  data(){
    return {
      list:[]
    }
  },
  created(){
    this.getBreadcrumb();
  },
  watch:{
    $route(to,from){
      this.getBreadcrumb();
    }
  },
  methods:{
    getBreadcrumb(){
      // 面包屑主要是用到 $route对象中的match属性，存放着匹配到的路由信息，是个数组
      this.list = this.$route.matched.filter(item=>item.meta && item.meta.title);
    },
    goBack(){
      // logout().then(res=>{
      //   console.log(res);
      //   let{code , data } = res.data;
      //   if(code == 20000){
      //     //删除token
      //     removeToken();
      //     this.$router.push('/login');
      //   }
      // })
      
      // 退出为啥要通过vuex来做？因为要清空vuex中的角色信息
      this.$store.dispatch('logout').then(res=>{
        removeToken();
        this.$router.push('/login');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-breadcrumb {
    margin: 20px 10px;
    &> .right-menu{
        float: right;
    }
  }
</style>
