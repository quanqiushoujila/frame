import $http from 'js/util/httpRequest'
import {request} from 'js/util'

export const sysDictionaryList = (data) => {
  const url = $http.adornUrl('/sys/dictionary/list')
  const method = 'get'
  return request({url, method, data})
}

export const sysDictionaryType = (data) => {
  const url = $http.adornUrl('/sys/dictionary/type')
  const method = 'get'
  return request({url, method, data})
}
