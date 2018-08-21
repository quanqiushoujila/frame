import Mock from 'mockjs'

let tableList = [
  {
    'id': 7,
    'createBy': null,
    'createName': null,
    'createDate': null,
    'updateBy': null,
    'updateName': null,
    'updateDate': null,
    'remarks': '备注7',
    'state': 1,
    'deptId': 49,
    'deptName': '市民政局',
    'auditDept': 0,
    'sysId': 1,
    'sysName': null,
    'code': 'G32657',
    'nameCn': '低保对象医疗费结算',
    'nameEn': 'dbdxylfjs',
    'deptCode': '600000018',
    'summary': '摘要7',
    'formatType1': 1,
    'formatType1ForShow': 11,
    'formatType2ForShow': 32,
    'buttMode': 1,
    'classify': '2',
    'areaId': null,
    'topicClassify': '',
    'classifyValue': null,
    'topicClassifyValue': null,
    'tbName': 'drs_info7',
    'updateFrequency': 1,
    'releaseDate': '2018-03-30',
    'auditState': 2,
    'states': null,
    'reason': '111',
    'isAuthorize': null,
    'eleList': [
      {
        'id': 1695,
        'createBy': null,
        'createName': null,
        'createDate': null,
        'updateBy': null,
        'updateName': null,
        'updateDate': null,
        'remarks': '备注7',
        'state': 1,
        'nameCn': '性别',
        'nameEn': 'infotype7',
        'infoId': 7,
        'infoName': null,
        'dataType': 1,
        'length': '80',
        'decimals': '2',
        'areaId': null,
        'deptId': 49,
        'deptName': null,
        'shareType': 1,
        'shareCondition': '条件7',
        'shareMode1': 1,
        'shareMode2': 1,
        'isOpen': 0,
        'openCondition': '条件7',
        'auditState': 2,
        'comparResult': null,
        'isClean': null,
        'poolId': null,
        'count': null,
        'colId': null,
        'source': null
      }
    ],
    'labelList': [],
    'tableId': null,
    'ids': null,
    'count': null,
    'auditBy': 1,
    'auditByName': null,
    'submitBy': 1,
    'submitByName': null,
    'sort': 99999,
    'downDate': null,
    'historyId': 0,
    'labelId': null
  }
]

var dataList1 = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList1.push(Mock.mock({
    'id': '@increment',
    'count': '@increment',
    'nameCn': '@name'
  }))
}

var dataList2 = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList2.push(Mock.mock({
    'id': '@increment',
    'count': '@increment',
    'nameCn': '@name'
  }))
}

var dataList3 = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList3.push(Mock.mock({
    'id': '@increment',
    'count': '@increment',
    'nameCn': '@name'
  }))
}

export function depart () {
  return {
    // isOpen: false,
    url: '/catalog/resourcesCatalog/depart',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: dataList1
    }
  }
}

export function classify () {
  return {
    // isOpen: false,
    url: '/catalog/resourcesCatalog/classify',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: dataList2
    }
  }
}

export function topicClassify () {
  return {
    // isOpen: false,
    url: '/catalog/resourcesCatalog/topicClassify',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: dataList3
    }
  }
}

export function table () {
  return {
    // isOpen: false,
    url: '/catalog/resourcesCatalog/table',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: tableList
    }
  }
}
