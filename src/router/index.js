import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/HelloWorld' },
    { path: '/HelloWorld', name: 'HelloWorld', component: () => import('components/HelloWorld') },
    // 登录页
    { path: '/login', name: 'login', component: () => import('page/common/login'), meta: {isTab: true} },
    // 404
    { path: '/404', name: '404', component: () => import('page/common/404'), meta: {isTab: true} },
    // 主页
    { path: '/main/:navId', name: 'main', component: () => import('page/common/main'), meta: {isTab: true} },
    // 主菜单页
    { path: '/mainIndex', name: 'mainIndex', component: () => import('page/common/mainIndex'), meta: {isTab: true} },
    // 图标
    { path: '/icon', name: 'icon', component: () => import('page/common/icon'), meta: {isTab: true} },
    { path: '*', redirect: '/404' }
  ]
})
