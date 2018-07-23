import $http from 'js/util/httpRequest'
import {request} from 'js/util'

export const sysParameList = (data) => {
  const url = $http.adornUrl('/sys/parame/list')
  const method = 'get'
  return request({url, method, data})
}

export const sysParameSkin = (data) => {
  const url = $http.adornUrl('/sys/parame/skin')
  const method = 'get'
  return request({url, method, data})
}
