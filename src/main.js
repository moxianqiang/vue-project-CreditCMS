// （1）
// 入口文件，此文件全局引入Vue，把整个项目挂载在<div id="app"></div>
// 全局引入Element-UI
// 引入vuex的文件，但不是引入vuex，vuex是在store文件夹中的index.js引入

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'

// 引入全局自定义组件
import './components/global'
// 引入全局自定义filters
import './filters/index'
//路由拦截
import './permission'

Vue.use(ElementUI);

// 阻止开发过程中的一些不必要提示信息
Vue.config.productionTip = false

// import axios from 'axios'
// Vue.prototype.$http = axios;
// axios.defaults.baseURL = 'http://127.0.0.1:3333/'   

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
