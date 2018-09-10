var dataList = [
  {
    'id': 1,
    'createBy': null,
    'createName': null,
    'createDate': null,
    'updateBy': null,
    'updateName': null,
    'updateDate': null,
    'remarks': '',
    'state': 1,
    'parentId': 0,
    'name': '是否显示',
    'value': 'show_hide',
    'type': 1,
    'sort': 1,
    'children': [
      {
        'id': 11,
        'createBy': null,
        'createName': null,
        'createDate': null,
        'updateBy': null,
        'updateName': null,
        'updateDate': null,
        'remarks': '',
        'state': 1,
        'parentId': 1,
        'name': '显示',
        'value': '1',
        'type': 2,
        'sort': 11,
        'children': []
      },
      {
        'id': 12,
        'createBy': null,
        'createName': null,
        'createDate': null,
        'updateBy': null,
        'updateName': null,
        'updateDate': null,
        'remarks': '',
        'state': 1,
        'parentId': 1,
        'name': '隐藏',
        'value': '0',
        'type': 2,
        'sort': 12,
        'children': []
      }
    ]
  },
  {
    'id': 2,
    'createBy': null,
    'createName': null,
    'createDate': null,
    'updateBy': null,
    'updateName': null,
    'updateDate': null,
    'remarks': '',
    'state': 1,
    'parentId': 0,
    'name': '是否',
    'value': 'yes_no',
    'type': 1,
    'sort': 2,
    'children': [
      {
        'id': 13,
        'createBy': null,
        'createName': null,
        'createDate': null,
        'updateBy': null,
        'updateName': null,
        'updateDate': null,
        'remarks': '',
        'state': 1,
        'parentId': 2,
        'name': '是',
        'value': '1',
        'type': 2,
        'sort': 21,
        'children': []
      },
      {
        'id': 14,
        'createBy': null,
        'createName': null,
        'createDate': null,
        'updateBy': null,
        'updateName': null,
        'updateDate': null,
        'remarks': '',
        'state': 1,
        'parentId': 2,
        'name': '否',
        'value': '0',
        'type': 2,
        'sort': 22,
        'children': []
      }
    ]
  },
  {
    'id': 3,
    'createBy': null,
    'createName': null,
    'createDate': null,
    'updateBy': null,
    'updateName': null,
    'updateDate': null,
    'remarks': '',
    'state': 1,
    'parentId': 0,
    'name': '是否必填',
    'value': 'is_require',
    'type': 1,
    'sort': 3,
    'children': [
      {
        'id': 15,
        'createBy': null,
        'createName': null,
        'createDate': null,
        'updateBy': null,
        'updateName': null,
        'updateDate': null,
        'remarks': '',
        'state': 1,
        'parentId': 3,
        'name': '必填',
        'value': '1',
        'type': 2,
        'sort': 31,
        'children': []
      },
      {
        'id': 16,
        'createBy': null,
        'createName': null,
        'createDate': null,
        'updateBy': null,
        'updateName': null,
        'updateDate': null,
        'remarks': '',
        'state': 1,
        'parentId': 3,
        'name': '非必填',
        'value': '0',
        'type': 2,
        'sort': 32,
        'children': []
      }
    ]
  }
]

export function dicList () {
  return {
    url: '/dicList',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': dataList
    }
  }
}
