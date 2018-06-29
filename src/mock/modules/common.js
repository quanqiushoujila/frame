import Mock from 'mockjs'

// 登录
export function login () {
  return {
    // isOpen: false,
    url: '/login',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'token': Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32)
    }
  }
}

// 退出
export function logout () {
  return {
    // isOpen: false,
    url: '/logout',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 用户信息
export function user () {
  return {
    url: '/user',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': {
        'username': 'admin'
      }
    }
  }
}

// 当前代办事项
export function info () {
  return {
    url: '/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'count': 8
    }
  }
}
