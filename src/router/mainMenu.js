import _import from './import'

export const mainMenu = [
  {},
  // 1
  {},
  // 2
  {},
  // 3
  {},
  // 4
  {},
  // 5
  {},
  // 6
  {},
  // 7
  {},
  // 8
  {},
  // 9 system
  { path: '/system', name: 'mainMenu', component: _import('system/menu'), meta: {title: '菜单管理', isTab: false, navId: 9} }
]

export const mainName = mainMenu.map((item) => {
  return item.name ? {name: item.name} : {name: ''}
})
