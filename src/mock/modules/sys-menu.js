// 生成数据列表
var dataList = [
  {
    'id': 2,
    'name': '系统管理',
    'icon': 'icon-houtaiguanli',
    'parentName': '顶级菜单',
    'parentId': 0,
    'type': 1,
    'sort': 1,
    'permission': '11',
    'level': 1,
    'url': '/sys',
    'moduleType': 1,
    'children': [
      {
        'id': 3,
        'name': '菜单管理',
        'icon': 'icon-dianziqianzhang',
        'parentName': '系统管理',
        'parentId': 2,
        'type': 1,
        'sort': 2,
        'permission': '11',
        'level': 2,
        'url': '/sys',
        'moduleType': 1,
        'children': [
          {
            'id': 8,
            'name': '菜单新增',
            'icon': 'add',
            'parentName': '菜单管理',
            'parentId': 3,
            'type': 2,
            'sort': 4,
            'permission': 'sys:menu:add',
            'url': '/sys',
            'moduleType': 1,
            'level': 3
          },
          {
            'id': 9,
            'name': '菜单删除',
            'icon': 'delete',
            'parentName': '菜单管理',
            'parentId': 3,
            'type': 2,
            'sort': 5,
            'permission': 'sys:menu:delete',
            'url': '/sys',
            'moduleType': 1,
            'level': 3
          }
        ]
      },
      {
        'id': 4,
        'name': '角色管理',
        'icon': 'icon-jiaoseguanli',
        'parentName': '系统管理',
        'parentId': 2,
        'type': 1,
        'sort': 3,
        'permission': '11',
        'level': 2,
        'url': '/sys',
        'moduleType': 1,
        'children': [
          {
            'id': 10,
            'name': '菜单删除',
            'icon': 'delete',
            'parentName': '角色管理',
            'parentId': 4,
            'type': 2,
            'sort': 6,
            'permission': 'sys:role:delete',
            'url': '/sys',
            'moduleType': 1,
            'level': 3
          }
        ]
      }
    ]
  },
  {
    'id': 6,
    'name': '系统监控',
    'icon': 'icon-jiankong',
    'parentName': '顶级菜单',
    'parentId': 0,
    'type': 0,
    'sort': 7,
    'permission': '11',
    'level': 1,
    'url': '/sys',
    'moduleType': 1,
    'children': [
      {
        'id': 7,
        'name': '操作日志',
        'icon': 'icon-IDCjifang',
        'parentName': '系统监控',
        'parentId': 6,
        'type': 1,
        'sort': 8,
        'permission': '11',
        'level': 2,
        'url': '/sys',
        'moduleType': 1,
        'children': [
          {
            'id': 11,
            'name': '菜单删除',
            'icon': 'delete',
            'parentName': '操作日志',
            'parentId': 7,
            'type': 1,
            'sort': '9',
            'permission': 'sys:log:delete',
            'url': '/sys',
            'moduleType': 1,
            'level': 3
          }
        ]
      }
    ]
  }
]

// 上级菜单
export function parentId () {
  return {
    url: '/sys/menu/parentId',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: [
        {
          id: 1,
          label: '顶级菜单',
          children: [
            {
              id: 2,
              label: '系统配置',
              children: [
                {
                  id: 3,
                  label: '菜单管理'
                },
                {
                  id: 4,
                  label: '角色管理'
                },
                {
                  id: 5,
                  label: '用户管理'
                }
              ]
            },
            {
              id: 6,
              label: '系统监控',
              children: [
                {
                  id: 7,
                  label: '操作日志'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
// 类型
export function type () {
  return {
    url: '/sys/menu/type',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: [{id: 1, label: '菜单', value: '1'}, {id: 2, label: '按钮', value: '2'}, {id: 3, label: '目录', value: '3'}]
    }
  }
}
// 所属模块
export function moduleType () {
  return {
    url: '/sys/menu/moduleType',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: [{id: 1, label: '模块1', value: '1'}, {id: 2, label: '模块2', value: '2'}]
    }
  }
}
// 获取菜单列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/menu/list',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: dataList
    }
  }
}
// 添加菜单
export function add () {
  return {
    // isOpen: false,
    url: '/sys/menu/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改菜单
export function update () {
  return {
    // isOpen: false,
    url: '/sys/menu/update',
    type: 'put',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除菜单
export function del () {
  return {
    // isOpen: false,
    url: '/sys/menu/delete',
    type: 'delete',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
