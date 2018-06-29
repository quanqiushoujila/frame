import $http from 'js/util/httpRequest'

const responseType1 = 'application/x-www-form-urlencoded; charset=utf-8'
const responseType2 = 'application/json; charset=utf-8'

/**
 * [ajax请求封装]
 * @param  {[type]} options.url    [路劲]
 * @param  {String} options.method [属性] 默认 post
 * @param  {Object} options.data   [数据]
 * @param  {String} contentType    [格式] 默认 json
 * @param  {[type]} responseType}  [数据类型] 默认 application/json; charset=utf-8
 * @return {[type]}                [description]
 * json: 'application/json; charset=utf-8'
 * form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
function request ({url, method = 'post', data = {}, contentType = 'json', responseType}) {
  let type
  if (responseType === 'form') {
    type = responseType1
  } else if (responseType) {
    type = responseType
  } else if (responseType == null) {
    if (contentType === 'json') {
      type = responseType2
    } else {
      type = responseType1
    }
  }
  // const type = responseType === 'form' ? responseType1 : (responseType ? responseType : (contentType === 'json' ? responseType2 : responseType1))

  return new Promise((resolve, reject) => {
    $http({
      url: url,
      method: method,
      data: $http.adornData({data: data, method: method, contentType: contentType}),
      headers: {
        'Content-Type': type
      }
    }).then(({data}) => {
      resolve(data)
    })
  })
}

/**
 * 登录
 */
export const login = (data) => {
  const url = $http.adornUrl('/login')
  const method = 'post'
  return request({url, method, data})
}

/**
 * 退出
 */
export const logout = (data) => {
  const url = $http.adornUrl('/logout')
  const method = 'post'
  return request({url, method, data})
}

/**
 * [获取当前用户信息]
 */
export const user = (data) => {
  const url = $http.adornUrl('/user')
  const method = 'get'
  return request({url, method, data})
}

/**
 * 当前代办事项
 */
export const info = (data) => {
  const url = $http.adornUrl('/info')
  const method = 'get'
  return request({url, method, data})
}

/**
 * [主菜单]
 */
export const mainIndex = (data) => {
  const url = $http.adornUrl('/mainIndex')
  const method = 'get'
  return request({url, method, data})
}
/**
 * [子菜单]
 */
export const main = (data) => {
  const url = $http.adornUrl('/main')
  const method = 'get'
  return request({url, method, data})
}
