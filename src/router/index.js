import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/HelloWorld' },
    { path: '/HelloWorld', name: 'HelloWorld', component: () => import('components/HelloWorld') },
    // 登录页
    { path: '/login', name: 'login', component: () => import('page/common/login') },
    // 404
    { path: '/404', name: '404', component: () => import('page/common/404') },
    // 主页
    { path: '/main', name: 'main', component: () => import('page/common/main') },
    // 主菜单页
    { path: '/mainIndex', name: 'mainIndex', component: () => import('page/common/mainIndex') },
    // 图标
    { path: '/icon', name: 'icon', component: () => import('page/common/icon') },
    { path: '*', redirect: '/404' }
  ]
})
