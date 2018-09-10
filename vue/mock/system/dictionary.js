var dataList = [
  {
    'id': 1,
    'remarks': '',
    'state': 1,
    'parentId': 0,
    'name': '是否显示',
    'value': 'show_hide',
    'type': 1,
    'sort': 1,
    'level': 1,
    'children': [
      {
        'id': 11,
        'remarks': '',
        'state': 1,
        'parentId': 1,
        'name': '显示',
        'value': '1',
        'type': 2,
        'sort': 11,
        'level': 2
      }
    ]
  }
]
// 获取菜单列表
// sysDictionaryList
function list () {
  return {
    // isOpen: false,
    url: '/sys/dictionary/list',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      count: 20,
      data: dataList
    }
  }
}

// 类型
function getVal () {
  return {
    // isOpen: false,
    url: '/sys/dictionary/type',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: [
        {
          id: 1,
          label: '字典'
        },
        {
          id: 2,
          label: '字典项'
        }
      ]
    }
  }
}

fnCreate([list, getVal], false)
