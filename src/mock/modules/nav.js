const navList = [
  {id: '1', name: '资产普查', remarks: 'icon-jianchajihua'},
  {id: '2', name: '数据目录', remarks: 'icon-mulu1'},
  {id: '3', name: '业务事项', remarks: 'icon-yewu'},
  {id: '4', name: '数源认责', remarks: 'icon-duijie'},
  {id: '5', name: '数据治理', remarks: 'icon-biaozhun'},
  {id: '6', name: '数据标签', remarks: 'icon-biaoqian'},
  {id: '7', name: '服务注册', remarks: 'icon-zhuce'},
  {id: '8', name: '信息采集', remarks: 'icon-xinxicaiji'},
  {id: '9', name: '项目管理', remarks: 'icon-xiangmu'},
  {id: '10', name: '系统配置', remarks: 'icon-kaohejilu'}
]

const navList10 = [
  {
    id: 11,
    name: '系统配置',
    icon: 'icon-shezhi1',
    children: [
      {id: 12, name: '菜单管理', icon: 'icon-daiban', path: 'system/menu'},
      {id: 13, name: '角色管理', icon: 'icon-jiaoseguanli', path: 'system/role'}
    ]
  },
  {
    id: 14,
    name: '系统监控',
    icon: 'icon-plus-datareport',
    children: [
      {id: 15, name: '操作日志', icon: 'icon-IDCjifang', path: 'system/log'}
    ]
  }
]

export function mainIndex () {
  return {
    url: '/mainIndex',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': navList
    }
  }
}

export function subNavList () {
  return {
    url: '/main',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': navList10
    }
  }
}
