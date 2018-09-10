var menuList = [
  {
    'id': 11,
    'name': '系统配置',
    'icon': 'icon-shezhi1',
    'children': [
      {'id': 12, 'name': '菜单管理', 'icon': 'icon-daiban', 'path': '../system/menu/index.html'},
      {'id': 16, 'name': '字典管理', 'icon': 'icon-daiban', 'path': '../system/dictionary/index.html'},
      {'id': 17, 'name': '行政区划', 'icon': 'icon-jiaoseguanli', 'path': '../system/compartment/index.html'},
      {'id': 18, 'name': '参数配置', 'icon': 'icon-jiaoseguanli', 'path': '../system/parame/index.html'},
      {'id': 19, 'name': '定时任务管理', 'icon': 'icon-jiaoseguanli', 'path': '../system/time/index.html'},
      {'id': 20, 'name': '机构管理', 'icon': 'icon-jiaoseguanli', 'path': '../system/department/index.html'},
      {'id': 21, 'name': '角色管理', 'icon': 'icon-jiaoseguanli', 'path': '../system/role/index.html'},
      {'id': 22, 'name': '用户管理', 'icon': 'icon-yonghuguanli', 'path': '../system/user/index.html'}
    ]
  },
  {
    'id': 14,
    'name': '系统监控',
    'icon': 'icon-plus-datareport',
    'children': [
      {'id': 15, 'name': '操作日志', 'icon': 'icon-IDCjifang', 'path': '../system/log/index.html'}
    ]
  }
]
function menu () {
  return {
    url: '/menu',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': menuList
    }
  }
}
fnCreate([menu], false)
