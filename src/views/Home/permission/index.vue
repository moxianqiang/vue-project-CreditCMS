<template>
  <div class="hello">
    <!-- 二级路由渲染 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '我是权限管理页'
    }
  }
}
</script>