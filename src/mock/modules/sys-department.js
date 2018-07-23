// 生成数据列表
var dataList = [
  {
    'id': 1,
    'name': '市纪委',
    'parentId': 0,
    'parentName': '顶级菜单',
    'code': '600000019',
    'areaId': 1,
    'areaName': '西安市',
    'level': 0,
    'type': 1,
    'typeForShow': '行政机关',
    'sort': 19
  },
  {
    'id': 2,
    'name': '市民政局',
    'parentName': '顶级菜单',
    'parentId': 0,
    'code': '600000018',
    'areaId': 1,
    'areaName': '西安市',
    'level': 0,
    'type': 1,
    'typeForShow': '行政机关',
    'sort': 18
  }
]

export function list () {
  return {
    url: '/sys/department/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'count': dataList.length,
      'data': dataList
    }
  }
}
// 机构类别
export function typeList () {
  return {
    url: '/sys/department/type',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': [
        {
          id: 1,
          label: '行政机关'
        },
        {
          id: 2,
          label: '事业单位'
        },
        {
          id: 3,
          label: '社会团体'
        },
        {
          id: 4,
          label: '其他组织机构'
        }
      ]
    }
  }
}
