import _import from './import'
import { mainMenu } from './mainMenu'

export let children = [
  // 数据目录
  { path: '/catalog/resourcesCatalog', name: 'resourcesCatalog', component: _import('catalog/resourceCatalog/index'), meta: {title: '资源目录', isTab: true, navId: 1} },
  // 系统配置
  { path: '/system/menu', name: 'menu', component: _import('system/menu/index'), meta: {title: '菜单管理', isTab: true, navId: 9} },
  { path: '/system/compartment', name: 'compartment', component: _import('system/compartment/index'), meta: {title: '行政区划', isTab: true, navId: 9} },
  { path: '/system/parame', name: 'parame', component: _import('system/parame/index'), meta: {title: '参数配置', isTab: true, navId: 9} },
  { path: '/system/time', name: 'time', component: _import('system/time/index'), meta: {title: '定时任务管理', isTab: true, navId: 9} },
  { path: '/system/department', name: 'department', component: _import('system/department/index'), meta: {title: '机构管理', isTab: true, navId: 9} },
  { path: '/system/dictionary', name: 'dictionary', component: _import('system/dictionary/index'), meta: {title: '字典管理', isTab: true, navId: 9} },
  { path: '/system/role', name: 'role', component: _import('system/role/index'), meta: {title: '角色管理', isTab: true, navId: 9} },
  { path: '/system/user', name: 'user', component: _import('system/user/index'), meta: {title: '用户管理', isTab: true, navId: 9} },
  { path: '/system/log', name: 'log', component: _import('system/log/index'), meta: {title: '操作日志', isTab: true, navId: 9} }
].concat(mainMenu.filter((item, index) => {
  return item.path
})).concat([{ path: '*', redirect: { name: '404' } }])
