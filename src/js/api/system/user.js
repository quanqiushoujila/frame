import $http from 'js/util/httpRequest'
import {request} from 'js/util'

/**
 * [配置/用户管理]
 */
export const sysUserList = (data) => {
  const url = $http.adornUrl('/sys/user/list')
  const method = 'get'
  return request({url, method, data})
}

export const sysUserDeptName = (data) => {
  const url = $http.adornUrl('/sys/user/deptName')
  const method = 'get'
  return request({url, method, data})
}

export const sysUserRole = (data) => {
  const url = $http.adornUrl('/sys/user/role')
  const method = 'get'
  return request({url, method, data})
}

export const sysUserTree = (data) => {
  const url = $http.adornUrl('/sys/user/tree')
  const method = 'get'
  return request({url, method, data})
}
