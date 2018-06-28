import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let childrenRouters = []

let routes = [
  { path: '/', redirect: '/login' },
  // 登录页
  { path: '/login', name: 'login', component: () => import('page/common/login'), meta: {isTab: true} },
  // 404
  { path: '/404', name: '404', component: () => import('page/common/404') },
  // 主菜单页
  { path: '/mainIndex', name: 'mainIndex', component: () => import('page/common/mainIndex') },
  // 图标
  { path: '/icon', name: 'icon', component: () => import('page/common/icon') },
  // 主页
  { path: '/main/:navId', name: 'main', component: () => import('page/common/main'), children: childrenRouters },
  { path: '*', redirect: '/404' }
]

export default new Router({
  mode: 'history',
  routes: routes
})
