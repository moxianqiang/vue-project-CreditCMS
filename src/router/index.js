// （3）
import Vue from 'vue'
import VueRouter from 'vue-router'
import permission from './modules/permission'

Vue.use(VueRouter) 

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [  //常规配置
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue')  // 出口在App.vue
  },
  {
    path: '/home',
    name: 'home',
    redirect:'/index',
    meta:{title:'首页'},
    component: () => import( '../layout/index.vue'),  // 出口在App.vue
    children:[  // children 是 asyncRoutes
      {
        path: '/index',
        name: 'index',
        meta:{title:'首页'},
        component: () => import( '../views/Home/home/index.vue')  // 出口在Main.vue
      }
    ]
  }
] 

export const asyncRoutes = [  //动态配置
  {
    path: '/index',
    name: 'index',
    meta:{title:'首页',roles:['input','approve']},
    component: () => import( '../views/Home/home/index.vue')  // 出口在Main.vue
  },
  {
    path: '/loan-input',
    name: 'loan-input',
    meta:{title:'贷款申请',roles:['input']},
    component: () => import( '../views/Home/loan-input/index.vue')  // 出口在Main.vue
  },
  {
    path: '/input-manager', //申请管理
    name: 'input-manager',
    meta:{title:'申请管理',roles:['input']},
    component: () => import( '../views/Home/input-manager/index.vue')  // 出口在Main.vue
  },
  {
    path: '/loan-approve', //贷款审批
    name: 'loan-approve',
    meta:{title:'贷款审批',roles:['approve']},
    component: () => import( '../views/Home/loan-approve/index.vue'),  // 出口在Main.vue
    // /Home/loan-approve/index.vue里的<router-view />出口，要展示的组件一定是下面children里的component
    children:[
      {
        path: 'first',  //初审   /loan-approve/first
        name: 'first',
        meta:{title:'初审'},
        component: () => import( '../views/Home/loan-approve/first.vue')  // 出口在/loan-approve/index.vue。改变一种思想，不能根据组件文件摆放的层级关系，来决定是在第几级路由
      },
      {
        path: 'end',  //终审
        name: 'end',
        meta:{title:'终审'},
        component: () => import( '../views/Home/loan-approve/end.vue')  // 出口在/loan-approve/index.vue
      },
    ]
  },
  {
    path: '/contract',
    name: 'contract',
    meta: { title: '标的管理' ,roles:['approve']},
    component: () => import('../views/Home/contract/index')  // 出口在Main.vue
  },
  permission
];

// const routes = [
//   {
//     path: '/',
//     redirect:'/home'
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import( '../views/Login.vue')
//   },
//   {
//     path: '/home',
//     name: 'home',
//     redirect:'/index',
//     meta:{title:'首页'},
//     component: () => import( '../layout/index.vue'),
//     children:[
//       {
//         path: '/index',
//         name: 'index',
//         meta:{title:'首页',roles:['input','approve']},
//         component: () => import( '../views/Home/home/index.vue')
//       },
//       {
//         path: '/loan-input',
//         name: 'loan-input',
//         meta:{title:'贷款申请',roles:['input']},
//         component: () => import( '../views/Home/loan-input/index.vue')
//       },
//       {
//         path: '/input-manager', //申请管理
//         name: 'input-manager',
//         meta:{title:'申请管理',roles:['input']},
//         component: () => import( '../views/Home/input-manager/index.vue')
//       },
//       {
//         path: '/loan-approve', //贷款审批
//         name: 'loan-approve',
//         meta:{title:'贷款审批',roles:['approve']},
//         component: () => import( '../views/Home/loan-approve/index.vue'),
//         children:[
//           {
//             path: 'first',  //初审
//             name: 'first',
//             meta:{title:'初审'},
//             component: () => import( '../views/Home/loan-approve/first.vue')
//           },
//           {
//             path: 'end',  //终审
//             name: 'end',
//             meta:{title:'终审'},
//             component: () => import( '../views/Home/loan-approve/end.vue')
//           },
//         ]
//       },
//       {
//         path: '/contract',
//         name: 'contract',
//         meta: { title: '标的管理',roles:['approve'] },
//         component: () => import('../views/Home/contract/index'),
//       },
//       permission
//     ]
//   }
// ]

// var a = [],b = [];
// router.addRoutes(b)

const router = new VueRouter({
  routes:constantRoutes
})

export default router
