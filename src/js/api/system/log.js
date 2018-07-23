import $http from 'js/util/httpRequest'
import {request} from 'js/util'

export const sysLogList = (data) => {
  const url = $http.adornUrl('/sys/log/list')
  const method = 'get'
  return request({url, method, data})
}
