import Mock from 'mockjs'
import * as common from './modules/common'
import * as jobSchedule from './modules/job-schedule'
import * as oss from './modules/oss'
import * as sysConfig from './modules/sys-config'
import * as sysLog from './modules/sys-log'
import * as sysMenu from './modules/sys-menu'
import * as sysRole from './modules/sys-role'
import * as sysUser from './modules/sys-user'
import * as nav from './modules/nav'
import * as sysDirection from './modules/sys-dictionary'
import * as sysCompartment from './modules/sys-compartment'
import * as sysDepartment from './modules/sys-department'
import * as sysParame from './modules/sys-parame'
import * as sysTime from './modules/sys-time'

// tips
// 1. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 2. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
fnCreate(common, false)
fnCreate(jobSchedule, false)
fnCreate(oss, false)
fnCreate(sysConfig, false)
fnCreate(sysLog, false)
fnCreate(sysMenu, false)
fnCreate(sysRole, false)
fnCreate(sysUser, false)
fnCreate(nav, false)
fnCreate(sysDirection, false)
fnCreate(sysCompartment, false)
fnCreate(sysDepartment, false)
fnCreate(sysParame, false)
fnCreate(sysTime, false)

// const BASE_URL = 'http://123.com'

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen = true) {
  if (isOpen) {
    for (let key in mod) {
      ((res) => {
        if (res.isOpen !== false) {
          Mock.mock(new RegExp(res.url), res.type, (opts) => {
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
    for (let key in mod) {
      ((res) => {
        Mock.mock('http://123.com' + res.url, res.type, res.data)
      })(mod[key]() || {})
    }
  }
}
