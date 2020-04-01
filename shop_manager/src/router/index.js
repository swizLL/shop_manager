import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  // 按需导入 需要使用该路由组建时 才带入
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [
      // 当请求home的时候 默认的直接重定向到welcome二级路由
      {
        path: '/home',
        redirect: '/welcome'
      },
      {
        path: '/welcome',
        component: () => import('@/views/Welcome.vue')
      },
      {
        path:'/users',
        component:()=>import('@/components/Users')
      },
      {
        path:'/rights',
        component:()=>import('@/components/Privilge')
      }
      ,
      {
        path:'/rights',
        component:()=>import('@/components/Privilge/role.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 添加路由守卫  beforeEach导航守卫
// to  表示将要访问你的路径 form 从哪来  next 是下一个要进行的操作
router.beforeEach((to,from,next)=>{
  //对用户访问的路径进行拦截，如果是登录页面，则直接放行
  if(to.path==='/login'){
    return next()
  }
  //如果访问的不是登录页 则我们需要来检测用户是否登陆 如果登陆 则直接放行  否则 就跳转到登录页
  const token =window.sessionStorage.getItem('token')
  if(!token){
    //没有token
    return next('/login')
  }
  next()
})
export default router
