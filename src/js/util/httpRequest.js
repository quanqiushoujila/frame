// import Vue from 'vue'
import axios from 'axios'
// import router from '@/router'
import qs from 'qs'
import GLOBAL from 'js/config/_global'

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    // 'Content-Type': 'application/json; charset=utf-8'
  }
})
// 请求拦截器
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

/**
 * 请求拦截
 */
// http.interceptors.request.use(config => {
//   config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
//   return config
// }, error => {
//   return Promise.reject(error)
// })

/**
 * 响应拦截
 */
// http.interceptors.response.use(response => {
//   if (response.data && response.data.code === 401) { // 401, token失效
//     Vue.cookie.delete('token')
//     router.options.isAddDynamicMenuRoutes = false
//     router.push({ name: 'login' })
//   }
//   return response
// }, error => {
//   return Promise.reject(error)
// })

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  return GLOBAL.BASE_URL + actionName
}

/**
 * [请求数据处理]
 * @param  {Object} options.data [数据对象]
 * @param  {String} contentType  [数据格式]
 * @param  {String} method       [属性]
 * @return {[type]}              [description]
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = ({data = {}, contentType = 'json', method = 'get'}) => {
  return method === 'get' ? data : contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
