import $http from 'js/util/httpRequest'
import {request} from 'js/util'

export const sysDepartmentList = (data) => {
  const url = $http.adornUrl('/sys/department/list')
  const method = 'get'
  return request({url, method, data})
}

export const sysDepartmentType = (data) => {
  const url = $http.adornUrl('/sys/department/type')
  const method = 'get'
  return request({url, method, data})
}
