// 导航栏最下面一栏
const permission = {
  path: '/permission', //权限管理
  name: 'permission',
  meta:{title:'权限管理'},
  component: () => import( '@/views/Home/permission/index.vue'),  // 出口在Main.vue
  children:[
    {
      path: 'create',  //创建管理员
      name: 'create',
      meta:{title:'创建管理员'},
      component: () => import( '@/views/Home/permission/create.vue')  // 出口在/permission/index.vue
    },
    {
      path: 'list',  //列表展示
      name: 'list',
      meta:{title:'列表展示'},
      component: () => import( '@/views/Home/permission/list.vue')  // 出口在/permission/index.vue
    },
  ]
}
export default  permission