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
 * @param  {[type]} options.url    [url路劲]
 * @return {[type]}                [description]
 */
export const login = (data) => {
  const url = $http.adornUrl('/login')
  const method = 'post'

  return request({url, method, data})
}

export const mainIndex = (data) => {
  const url = $http.adornUrl('/mainIndex')
  const method = 'get'

  return request({url, method, data})
}

export const city = (data) => {
  const url = '/api/city.json'
  const method = 'post'
  const contentType = ''
  return request({url, method, data, contentType})
}
