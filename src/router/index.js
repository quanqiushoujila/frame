import Vue from 'vue'
import Router from 'vue-router'
import { main } from 'js/api'
import GLOBAL from 'js/config/_global'
import _import from './import'

Vue.use(Router)

let globalRoutes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: _import('common/login'), meta: {title: '登录'} },
  { path: '/404', name: '404', component: _import('common/404'), meta: {title: '404'} },
  { path: '/icon', name: 'icon', component: _import('common/icon'), meta: {title: '图标'} },
  { path: '/mainIndex', name: 'mainIndex', component: _import('common/mainIndex'), meta: {title: '主菜单'} },
  { path: '*', redirect: '/login' }
]

let mainRoutes = {
  path: '/main/:navId',
  name: 'main',
  component: _import('common/main'),
  meta: { title: '主页' },
  children: [],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      next({ name: 'login' })
    }
    next()
  }
}

let router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: globalRoutes.concat(mainRoutes),
  isAddDynamicMenuRoutes: false
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to) === 'global') {
    next()
  } else {
    main().then((res) => {
      if (res.code === GLOBAL.SUCCESS) {
        fnAddDynamicMenuRoutes(res.data)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(res.data || '[]'))
        next()
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  let temp = []
  for (let i = 0, len = menuList.length; i < len; i++) {
    let menu = menuList[i]
    if (menu.children && menu.children.length >= 1) {
      temp = temp.concat(menu.children)
    } else if (menu.path && /\S/.test(menu.path)) {
      let name = menu.path.slice(menu.path.lastIndexOf('/') + 1)
      let route = {
        path: menu.path,
        name: name,
        component: null,
        meta: {
          menuId: menu.id,
          title: menu.name,
          isTab: true,
          iframeUrl: ''
        }
      }
      console.log(menu.path)
      route.component = _import(menu.path)
      // route.component = () => import(`page/${menu.path}`)
      routes.push(route)
    }
  }

  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes
    ])
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(router)
    console.log(mainRoutes)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
