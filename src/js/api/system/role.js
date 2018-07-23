import $http from 'js/util/httpRequest'
import {request} from 'js/util'

export const sysRoleList = (data) => {
  const url = $http.adornUrl('/sys/role/list')
  const method = 'get'
  return request({url, method, data})
}
