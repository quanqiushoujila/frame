import $http from 'js/util/httpRequest'
import {request} from 'js/util'

export const sysCompartmentList = (data) => {
  const url = $http.adornUrl('/sys/compartment/list')
  const method = 'get'
  return request({url, method, data})
}

export const sysCompartmentComLevel = (data) => {
  const url = $http.adornUrl('/sys/compartment/comLevel')
  const method = 'get'
  return request({url, method, data})
}

export const sysCompartmentAreaName = (data) => {
  const url = $http.adornUrl('/sys/compartment/areaName')
  const method = 'get'
  return request({url, method, data})
}
