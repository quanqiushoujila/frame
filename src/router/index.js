import Vue from 'vue'
import Router from 'vue-router'
import _import from './import'
import { mainMenu } from './mainMenu'
import { children } from './childrenMenu'

Vue.use(Router)

let globalRoutes = [
  // 测试
  { path: '/test/test1', name: 'table', component: _import('test/test1/index'), meta: {title: '案例1'} },

  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: _import('common/login'), meta: {title: '登录'} },
  { path: '/404', name: '404', component: _import('common/404'), meta: {title: '404'} },
  { path: '/icon', name: 'icon', component: _import('common/icon'), meta: {title: '图标'} },
  { path: '/mainIndex', name: 'mainIndex', component: _import('common/mainIndex'), meta: {title: '主菜单'}, beforeEnter (to, from, next) { before(to, from, next) } },
  { path: '*', redirect: '/login' }
]

let mainRoutes = {
  path: '/main/:navId',
  name: 'main',
  component: _import('common/main'),
  meta: { title: '主页' },
  children: children,
  beforeEnter (to, from, next) {
    before(to, from, next)
  }
}

let router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: globalRoutes.concat(mainRoutes),
  isAddDynamicMenuRoutes: false
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      removeSession()
      next()
    } else {
      next({ name: 'mainIndex' })
    }
  } else if (to.name === 'mainIndex') {
    next()
  } else {
    if ((to.params.navId || to.params.navId === 0) && mainMenu.length > to.params.navId) {
      const id = +to.params.navId
      if (mainMenu[id].name) {
        next({name: mainMenu[id].name})
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

function before (to, from, next) {
  let token = Vue.cookie.get('token')
  if (!token || !/\S/.test(token)) {
    removeSession()
    next({ name: 'login' })
  }
  next()
}

function removeSession () {
  sessionStorage.setItem('menuList', []) // 菜单
  sessionStorage.setItem('permissions', []) // 权限
  sessionStorage.setItem('menuIndexList', []) // 主菜单
  sessionStorage.setItem('dicList', []) // 字典
}

export default router
