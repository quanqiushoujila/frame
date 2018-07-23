import $http from 'js/util/httpRequest'
import {request} from 'js/util'

export const sysTimeList = (data) => {
  const url = $http.adornUrl('/sys/time/list')
  const method = 'get'
  return request({url, method, data})
}
