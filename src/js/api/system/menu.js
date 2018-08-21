import $http from 'js/util/httpRequest'
import {request} from 'js/util'
/**
 * [配置/菜单管理]
 */
export const sysMenuList = (data) => {
  const url = $http.adornUrl('/sys/menu/list')
  const method = 'get'
  return request({url, method, data})
}
export const sysMenuType = (data) => {
  const url = $http.adornUrl('/sys/menu/type')
  const method = 'get'
  return request({url, method, data})
}
export const sysMenuModuleType = (data) => {
  const url = $http.adornUrl('/sys/menu/moduleType')
  const method = 'get'
  return request({url, method, data})
}
export const sysMenuParentId = (data) => {
  const url = $http.adornUrl('/sys/menu/parentId')
  const method = 'get'
  return request({url, method, data})
}

export const update = (data) => {
  const url = $http.adornUrl('/sys/menu/update')
  const method = 'put'
  return request({url, method, data})
}

export const deletes = (data) => {
  const url = $http.adornUrl('/sys/menu/delete')
  const method = 'delete'
  return request({url, method, data})
}
