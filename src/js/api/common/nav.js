import $http from 'js/util/httpRequest'
import {request} from 'js/util'

/**
 * 获取主菜单，子菜单，权限
 */
export const mainAll = (data) => {
  const url = $http.adornUrl('/mainAll')
  const method = 'get'
  return request({url, method, data})
}

/**
 * 字典字段
 */
export const dicList = (data) => {
  const url = $http.adornUrl('/dicList')
  const method = 'get'
  return request({url, method, data})
}
