import $http from 'js/util/httpRequest'
import {request} from 'js/util'

/**
 * 部门类
 */
export const depart = (data) => {
  const url = $http.adornUrl('/catalog/resourcesCatalog/depart')
  const method = 'get'
  return request({url, method, data})
}

/**
 * 基础资源分类
 */
export const classify = (data) => {
  const url = $http.adornUrl('/catalog/resourcesCatalog/classify')
  const method = 'get'
  return request({url, method, data})
}
/**
 * 主题资源分类
 */
export const topicClassify = (data) => {
  const url = $http.adornUrl('/catalog/resourcesCatalog/topicClassify')
  const method = 'get'
  return request({url, method, data})
}
export const tableList = (data) => {
  const url = $http.adornUrl('/catalog/resourcesCatalog/table')
  const method = 'get'
  return request({url, method, data})
}
