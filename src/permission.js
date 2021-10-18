import router from './router'
import store from './store'

// （11）
// 路由拦截
router.beforeEach(async(to,from,next)=>{
  // 1、是否是登录页
  if(to.path == '/login'){
    next();
  } else {
    // 正常登录
    console.log('login');
    let R = store && store.getters.roles && store.getters.roles.length>0;
    if(R){
      next();
    } else {
      // 如果第一次登录账号，跳转到布局首页，路由拦截会进到这里，发现没有角色信息
      // 获取角色（12）                   userinfo在store/modules/user.js
      var {roles} = await store.dispatch('userinfo'); // （13，接收resolve传回来的值）
      console.log('第一次登录，查看角色信息', roles);   // 角色存放在一个数组里
      // 取出角色   取出后依然放在数组里
      var rolesName= roles.map(v=>v.name);
      // 过滤角色（14）                        GENERATEROUTES在store/modules/permission.js
      var filterRoutes = await store.dispatch('GENERATEROUTES',rolesName);  // rolesName是['角色名']格式   （15，接收resolve传回来的值）
      // 动态添加
      router.addRoutes(filterRoutes);   // 为什么要给router加上filterRoutes，因为router最终是被引入到src/main.js中Vue大对象里的，否则整个Vue应用用不了路由功能的。此时的router路由配置项是完整的，包括重定向、登录页、左侧导航栏
      if(roles){
        next({...to})
      } else {
        next({path:'/login'});
      }
    }
  }
})

// 函数签名：
// router.addRoutes(routes: Array<RouteConfig>)
// 动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组