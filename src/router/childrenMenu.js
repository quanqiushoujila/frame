import _import from './import'
import { mainMenu } from './mainMenu'

export let children = [
  { path: '/system/menu', name: 'menu', component: _import('system/menu'), meta: {title: '菜单管理', isTab: true, navId: 9} },
  { path: '/system/role', name: 'role', component: _import('system/role'), meta: {title: '角色管理', isTab: true, navId: 9} },
  { path: '/system/user', name: 'user', component: _import('system/user'), meta: {title: '用户管理', isTab: true, navId: 9} },
  { path: '/system/log', name: 'log', component: _import('system/log'), meta: {title: '操作日志', isTab: true, navId: 9} }
].concat(mainMenu.filter((item, index) => {
  return item.path
})).concat([{ path: '*', redirect: { name: '404' } }])
