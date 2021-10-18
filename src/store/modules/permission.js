// 这个页面是用来根据角色过滤路由，返回即将要加载的路由配置项
import {constantRoutes,asyncRoutes} from '@/router'

function filterAsyncRouter(routes, name){  //过滤角色
  var data = routes.filter(route=>{
    return route.meta && route.meta.roles && name.some(v=>route.meta.roles.includes(v))
  })
  return data;
}

const state = {
  // 需要渲染的路由配置信息
  routes:[]  //动态路由
};
const getters = {
  // sidebar.vue页面get_routes拿到的值，不包括“重定向的/”和“登录页/login”。因为渲染导航栏，不需要“重定向的/”和“登录页/login”
  get_routes: state => state.routes,
};
const mutations = {
  SET_ROUTES:(state, routes) => {
    state.routes = routes;
  }
};
const actions = {
  // （14）
  GENERATEROUTES({commit,state}, rolesName){   //通过角色来过滤路由     传入的rolesName是['角色名']格式
    return new Promise((resolve, reject) => {
      var _routes;
      //constantRoutes.filter(v=>v.path=='/home')返回含有[{path:'/home'}]这一项的数组，[0]是取出这个对象。这里的/home是整个布局页
      let home = constantRoutes.filter(v=>v.path=='/home')[0];
      home.children = []; // 清除home对象中的children属性的数组。为什么要清空？因为整个children都是首页布局组件的子路由，子路由的出口写在了布局组件里的main.vue
      if(rolesName.includes('administrator')){  // 判断是否管理员  是
        home.children = asyncRoutes;   // 全部导航信息都加载
      } else {  // 判断是否管理员  否
        // filterRouter 得到一个根据角色信息过滤的路由配置数组对象
        let filterRouter = filterAsyncRouter(asyncRoutes, rolesName);  // rolesName是['角色名']格式
        home.children = filterRouter;   // 导航信息根据角色加载
      };
      _routes = [home] || [];  // 把home这个对象放在数组里，因为src/permission.js中的router.addRoutes()方法要求传入的是数组，并且作一个空保护，以免router.addRoutes()方法调用报错
      console.log('routers' + _routes);   // _routes不包括“重定向的/”和“登录页/login”
      commit('SET_ROUTES', _routes);
      resolve(_routes)   // 把_routes（过滤后的路由）传回src/permission.js   （15）
    })
  },
};

export default{
  state,
  getters,
  mutations,
  actions
}
