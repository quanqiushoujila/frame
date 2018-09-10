var dataList = [
  {
    id: 1,
    name: '测试共享的信息资源',
    from: 1,
    fromForShow: '省公安厅',
    type: 1,
    typeForShow: '数据库',
    sort: 1,
    sortForShow: '社保就业',
    status: 1,
    statusForShow: '已提交',
    sets: 1
  },
  {
    id: 2,
    name: '测试待完善',
    from: 1,
    fromForShow: '省公安厅',
    type: 1,
    typeForShow: '数据库',
    sort: 1,
    sortForShow: '社保就业',
    status: 2,
    statusForShow: '待完善',
    sets: 1
  },
  {
    id: 3,
    name: '2测试待完善',
    from: 1,
    fromForShow: '省公安厅',
    type: 1,
    typeForShow: '数据库',
    sort: 1,
    sortForShow: '社保就业',
    status: 1,
    statusForShow: '待完善',
    sets: 1
  }
]
var dataList1 = [
  {
    id: 1,
    chineseName: '社保',
    englishName: '22222'
  }
]

function list () {
  return {
    url: '/test/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'count': dataList.length,
      'data': dataList
    }
  }
}
function list1 () {
  return {
    url: '/test/list1',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'count': dataList1.length,
      'data': dataList1
    }
  }
}

fnCreate([list, list1], false)
