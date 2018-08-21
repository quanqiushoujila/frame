import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'id': '@increment',
    'name': '@name',
    'remark': '@csentence',
    'menuIds': [3, 8, 9],
    'createTime': '@datetime'
  }))
}

// 获取角色列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/role/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'count': dataList.length,
      'data': dataList
    }
  }
}

// 获取角色列表, 根据当前用户
export function select () {
  return {
    // isOpen: false,
    url: '/sys/role/select',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': dataList
    }
  }
}

// 获取角色信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/role/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'role': dataList[0]
    }
  }
}

// 添加角色
export function add () {
  return {
    // isOpen: false,
    url: '/sys/role/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改角色
export function update () {
  return {
    // isOpen: false,
    url: '/sys/role/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除角色
export function del () {
  return {
    // isOpen: false,
    url: '/sys/role/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
