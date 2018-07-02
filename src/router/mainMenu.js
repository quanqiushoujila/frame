import _import from './import'

export const mainMenu = [
  { path: '/my1', name: 'my1', component: _import('my1/menu'), meta: {title: 'my1', isTab: false, navId: 0, isMain: true} },
  // 1
  { path: '/my2', name: 'my2', component: _import('my2/menu'), meta: {title: 'my2', isTab: false, navId: 1, isMain: true} },
  // 2
  { path: '/my3', name: 'my3', component: _import('my3/menu'), meta: {title: 'my3', isTab: false, navId: 2, isMain: true} },
  // 3
  { path: '/my4', name: 'my4', component: _import('my4/menu'), meta: {title: 'my4', isTab: false, navId: 3, isMain: true} },
  // 4
  { path: '/my5', name: 'my5', component: _import('my5/menu'), meta: {title: 'my5', isTab: false, navId: 4, isMain: true} },
  // 5
  { path: '/my6', name: 'my6', component: _import('my6/menu'), meta: {title: 'my6', isTab: false, navId: 5, isMain: true} },
  // 6
  { path: '/my7', name: 'my7', component: _import('my7/menu'), meta: {title: 'my7', isTab: false, navId: 6, isMain: true} },
  // 7
  { path: '/my8', name: 'my8', component: _import('my8/menu'), meta: {title: 'my8', isTab: false, navId: 7, isMain: true} },
  // 8
  { path: '/my9', name: 'my9', component: _import('my9/menu'), meta: {title: 'my9', isTab: false, navId: 8, isMain: true} },
  // 9 system
  { path: '/system', name: 'system', component: _import('system/user'), meta: {title: '用户管理', isTab: false, navId: 9, isMain: true} }
]

export const mainName = mainMenu.map((item) => {
  return item.name ? {name: item.name} : {name: ''}
})
