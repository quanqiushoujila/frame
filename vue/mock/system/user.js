// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'id': '@increment',
    'username': '@name',
    'email': '@email',
    'roleId': 1,
    'roleIdForShow': '姓名',
    'deptName': 1,
    'deptNameForShow': '姓名1',
    'realname': Mock.Random.word(),
    'telephone': 12345678901,
    'companyControl': [5, 8]
  }))
}

var roleList = [
  {
    id: 1,
    label: '姓名',
    value: '1'
  },
  {
    id: 2,
    label: '年龄',
    value: '2'
  }
]

var deptNameList = [
  {
    id: 1,
    label: '姓名1',
    value: '1'
  },
  {
    id: 2,
    label: '姓名2',
    value: '2'
  },
  {
    id: 3,
    label: '姓名3',
    value: '3'
  }
]

var treeList = [
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
]

function list () {
  return {
    // isOpen: false,
    url: '/sys/user/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'count': dataList.length,
      'data': dataList
    }
  }
}
// 选择角色数据
function getRole () {
  return {
    // isOpen: false,
    url: '/sys/user/role',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': roleList
    }
  }
}

// 所属单位数据
function getDeptName () {
  return {
    // isOpen: false,
    url: '/sys/user/deptName',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': deptNameList
    }
  }
}

// 管理部门数据
function getTree () {
  return {
    // isOpen: false,
    url: '/sys/user/companyControl',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': treeList
    }
  }
}

fnCreate([list, getRole, getDeptName, getTree], false)
