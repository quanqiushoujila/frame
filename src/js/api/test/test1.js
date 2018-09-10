import $http from 'js/util/httpRequest'
import {request} from 'js/util'

export const tableData = (data) => {
  const url = $http.adornUrl('/test/table')
  const method = 'get'
  return request({url, method, data})
}
export const tagData = (data) => {
  const url = $http.adornUrl('/test/tag')
  const method = 'get'
  return request({url, method, data})
}
export const fromData = (data) => {
  const url = $http.adornUrl('/test/from')
  const method = 'get'
  return request({url, method, data})
}
export const formatData = (data) => {
  const url = $http.adornUrl('/test/format')
  const method = 'get'
  return request({url, method, data})
}
export const dataIdsData = (data) => {
  const url = $http.adornUrl('/test/dataIds')
  const method = 'get'
  return request({url, method, data})
}

export const sexData = (data) => {
  const url = $http.adornUrl('/test/sex')
  const method = 'get'
  return request({url, method, data})
}

export const hobbyData = (data) => {
  const url = $http.adornUrl('/test/hobby')
  const method = 'get'
  return request({url, method, data})
}
