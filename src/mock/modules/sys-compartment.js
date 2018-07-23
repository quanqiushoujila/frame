var dataList = [
  {
    'id': 1,
    'name': '西安市',
    'code': '610100000000',
    'comLevel': 2,
    'parentId': 0,
    'parentName': '顶级菜单',
    'sort': 1,
    'state': 1,
    'children': [
      {
        'id': 2,
        'name': '未央区',
        'code': '610112000000',
        'comLevel': 3,
        'parentId': 1,
        'parentName': '西安市',
        'sort': 2,
        'state': 1,
        'children': []
      }
    ]
  }
]
// 所属行政区划
var areaNameList = [
  {
    'id': 1,
    'name': '西安市',
    'code': '610100000000',
    'comLevel': 2,
    'parentId': 0,
    'parentName': '顶级菜单',
    'sort': 1,
    'state': 1
  },
  {
    'id': 2,
    'name': '未央区',
    'code': '610112000000',
    'comLevel': 3,
    'parentId': 1,
    'parentName': '西安市',
    'sort': 2,
    'state': 1
  }
]

export function list () {
  return {
    // isOpen: false,
    url: '/sys/compartment/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'count': dataList.length,
      'data': dataList
    }
  }
}

export function areaName () {
  return {
    // isOpen: false,
    url: '/sys/compartment/areaName',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': areaNameList
    }
  }
}

// 区划级别
export function comLevel () {
  return {
    // isOpen: false,
    url: '/sys/compartment/comLevel',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': [
        {
          id: 1,
          label: '省级'
        },
        {
          id: 2,
          label: '市级'
        },
        {
          id: 3,
          label: '区级'
        },
        {
          id: 4,
          label: '街道级'
        },
        {
          id: 5,
          label: '村居级'
        }
      ]
    }
  }
}
