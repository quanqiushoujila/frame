/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen) {
  if (isOpen) {
    for (var key in mod) {
      (function (res) {
        if (res.isOpen !== false) {
          Mock.mock(new RegExp(res.url), res.type, function (opts) {
            opts['data'] = opts.body ? JSON.parse(opts.body) : null
            delete opts.body
            console.log('\n')
            console.log('%cmock拦截, 请求: ', 'color:blue', opts)
            console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
            return res.data
          })
        }
      })(mod[key]() || {})
    }
  } else {
    for (var key in mod) {
      (function (res) {
        Mock.mock('http://123.com' + res.url, res.type, res.data)
      })(mod[key]() || {})
    }
  }
}
