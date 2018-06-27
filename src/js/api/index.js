import $http from 'js/util/httpRequest'

/**
 * 登录
 * @param  {[type]} options.url    [url路劲]
 * @param  {String} options.method [属性]
 * @param  {Object} options.data   [数据]
 * @param  {String} responseType}  [数据类型]
 * @return {[type]}                [description]
 */
export const login = ({url, method = 'get', data = {}, responseType = 'json'}) => {
  return new Promise((resolve, reject) => {
    $http({
      url: url,
      method: method,
      data: data,
      responseType: responseType
    }).then(({data}) => {
      resolve(data)
    })
  })
}
