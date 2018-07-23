import $http from 'js/util/httpRequest'
import {request} from 'js/util'

/**
 * 登录
 */
export const login = (data) => {
  const url = $http.adornUrl('/login')
  const method = 'post'
  return request({url, method, data})
}

/**
 * 退出
 */
export const logout = (data) => {
  const url = $http.adornUrl('/logout')
  const method = 'post'
  return request({url, method, data})
}

/**
 * [获取当前用户信息]
 */
export const user = (data) => {
  const url = $http.adornUrl('/user')
  const method = 'get'
  return request({url, method, data})
}

/**
 * 当前代办事项
 */
export const info = (data) => {
  const url = $http.adornUrl('/info')
  const method = 'get'
  return request({url, method, data})
}
