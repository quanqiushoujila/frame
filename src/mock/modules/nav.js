const navList = [
  {id: '1', name: '资产普查', remarks: 'icon-jianchajihua', filename: 'my1'},
  {id: '2', name: '数据目录', remarks: 'icon-mulu1', filename: 'catalog'},
  {id: '3', name: '业务事项', remarks: 'icon-yewu', filename: 'my3'},
  {id: '4', name: '数源认责', remarks: 'icon-duijie', filename: 'my4'},
  {id: '5', name: '数据治理', remarks: 'icon-biaozhun', filename: 'my5'},
  {id: '6', name: '数据标签', remarks: 'icon-biaoqian', filename: 'my6'},
  {id: '7', name: '服务注册', remarks: 'icon-zhuce', filename: 'my7'},
  {id: '8', name: '信息采集', remarks: 'icon-xinxicaiji', filename: 'my8'},
  {id: '9', name: '项目管理', remarks: 'icon-xiangmu', filename: 'my9'},
  {id: '10', name: '系统配置', remarks: 'icon-kaohejilu', filename: 'system'}
]

const main = [
  [
    {
      id: 2,
      name: '我的资产',
      icon: 'icon-shezhi1',
      children: [
        {id: 22, name: '机房清单', icon: 'icon-daiban', path: '/my1/menu', filename: 'menu1'}
      ]
    }
  ],
  [
    {
      id: 3,
      name: '目录系统',
      icon: 'icon-shezhi1',
      children: [
        {id: 32, name: '资源目录', icon: 'icon-daiban', path: '/catalog/resourceCatalog', filename: 'resourcesCatalog'}
      ]
    }
  ],
  [
    {
      id: 4,
      name: '已发布的事项',
      icon: 'icon-shezhi1',
      children: [
        {id: 42, name: '已发布事项', icon: 'icon-daiban', path: '/my3/menu', filename: 'menu2'}
      ]
    }
  ],
  [
    {
      id: 5,
      name: '数源需求',
      icon: 'icon-shezhi1',
      children: [
        {id: 52, name: '需求梳理', icon: 'icon-daiban', path: '/my4/menu', filename: 'menu3'}
      ]
    }
  ],
  [
    {
      id: 6,
      name: '标签管理',
      icon: 'icon-shezhi1',
      children: [
        {id: 62, name: '标签设计', icon: 'icon-daiban', path: '/my5/menu', filename: 'menu4'}
      ]
    }
  ],
  [
    {
      id: 7,
      name: '标签管理',
      icon: 'icon-shezhi1',
      children: [
        {id: 72, name: '标签设计', icon: 'icon-daiban', path: '/my6/menu', filename: 'menu5'}
      ]
    }
  ],
  [
    {
      id: 8,
      name: '标签管理1',
      icon: 'icon-shezhi1',
      children: [
        {id: 82, name: '标签设计1', icon: 'icon-daiban', path: '/my7/menu', filename: 'menu6'}
      ]
    }
  ],
  [
    {
      id: 9,
      name: '标签管理2',
      icon: 'icon-shezhi1',
      children: [
        {id: 92, name: '标签设计2', icon: 'icon-daiban', path: '/my8/menu', filename: 'menu7'}
      ]
    }
  ],
  [
    {
      id: 10,
      name: '标签管理3',
      icon: 'icon-shezhi1',
      children: [
        {id: 102, name: '标签设计3', icon: 'icon-daiban', path: '/my9/menu', filename: 'menu8'}
      ]
    }
  ],
  [
    {
      id: 11,
      name: '系统配置',
      icon: 'icon-shezhi1',
      children: [
        {id: 12, name: '菜单管理', icon: 'icon-daiban', path: '/system/menu', filename: 'menu'},
        {id: 16, name: '字典管理', icon: 'icon-daiban', path: '/system/dictionary', filename: 'dictionary'},
        {id: 17, name: '行政区划', icon: 'icon-jiaoseguanli', path: '/system/compartment', filename: 'compartment'},
        {id: 18, name: '参数配置', icon: 'icon-jiaoseguanli', path: '/system/parame', filename: 'parame'},
        {id: 19, name: '定时任务管理', icon: 'icon-jiaoseguanli', path: '/system/time', filename: 'time'},
        {id: 20, name: '机构管理', icon: 'icon-jiaoseguanli', path: '/system/department', filename: 'department'},
        {id: 21, name: '角色管理', icon: 'icon-jiaoseguanli', path: '/system/role', filename: 'role'},
        {id: 22, name: '用户管理', icon: 'icon-yonghuguanli', path: '/system/user', filename: 'user'}
      ]
    },
    {
      id: 14,
      name: '系统监控',
      icon: 'icon-plus-datareport',
      children: [
        {id: 15, name: '操作日志', icon: 'icon-IDCjifang', path: '/system/log', filename: 'log'}
      ]
    }
  ]
]
const navList10 = [
  {
    id: 11,
    name: '系统配置',
    icon: 'icon-shezhi1',
    children: [
      {id: 12, name: '菜单管理', icon: 'icon-daiban', path: 'system/menu', filename: 'menu'},
      {id: 13, name: '角色管理', icon: 'icon-jiaoseguanli', path: 'system/role', filename: 'role'}
    ]
  },
  {
    id: 14,
    name: '系统监控',
    icon: 'icon-plus-datareport',
    children: [
      {id: 15, name: '操作日志', icon: 'icon-IDCjifang', path: 'system/log', filename: 'log'}
    ]
  }
]

const permissions = [
  'sys:user:info',
  'sys:user:update',
  'sys:user:delete'
]

const menu = {
  mainIndex: navList,
  main: main,
  permissions: permissions
}

export function mainAll () {
  return {
    url: '/mainAll',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': menu
    }
  }
}

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
