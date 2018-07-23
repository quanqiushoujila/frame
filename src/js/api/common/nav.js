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
