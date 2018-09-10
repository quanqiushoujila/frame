import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import clonedeep from 'lodash/clonedeep'
import $http from 'js/util/httpRequest'
import { getSession } from 'js/util/session'
/**
 * 初始化数据
 */
export function resetObject (data) {
  for (let key in data) {
    let val = data[key]
    if (isPlainObject(val)) {
      data[key] = {}
    } else if (isArray(val)) {
      data[key] = []
    } else {
      data[key] = ''
    }
  }
  return data
}

export function toggleDisabled (data, hasDisabled) {
  let d = clonedeep(data)
  disabled(d, hasDisabled)
  return d
}

function disabled (data, hasDisabled) {
  if (hasDisabled) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (!data[i].hasOwnProperty('disabled')) {
        data[i].disabled = true
        if (data[i].children && data[i].children.length > 0) {
          disabled(data[i].children, hasDisabled)
        }
      }
    }
  } else {
    for (let i = 0, len = data.length; i < len; i++) {
      if (data[i].hasOwnProperty('disabled')) {
        delete data[i].disabled
        if (data[i].children && data[i].children.length > 0) {
          disabled(data[i].children, hasDisabled)
        }
      }
    }
  }
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, expanded = false, id = 'id', pid = 'parentId') {
  let res = []
  getData(data)
  function getData (data) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (data[i].level > 1) {
        data[i]['_show'] = expanded
      } else {
        data[i]['_show'] = true
      }
      data[i]._expanded = expanded
      res.push(data[i])
      const children = data[i].children
      if (children && children.length > 0) {
        getData(children)
      }
    }
    return res
  }
  return res
}

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
export function request ({url, method = 'post', data = {}, contentType = 'json', responseType}) {
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

export function getSessionDicName ({data, dicName, value, empty}) {
  const dicData = data[dicName] || getSession('dicList')[dicName]
  let currentName = empty || ''
  for (let i = 0, len = dicData.length; i < len; i++) {
    if (+dicData[i].value === +value) {
      currentName = dicData[i].name
      break
    }
  }
  return currentName
}

// 获取数据字典对应数据
export function getRealData ({data, name, dicName, forName = 'ForShow', empty}) {
  const dicData = getSession('dicList')
  for (let i = 0, len = data.length; i < len; i++) {
    data[i][`${name}${forName}`] = getSessionDicName({data: dicData, dicName: dicName, value: data[i][name], forName: forName})
  }
  return data
}
// 获取数据字典对应数据
export function getSessionDicData (name) {
  return JSON.parse(getSession('dicList'))[name]
}

export function getCurrentMenu (name) {
  let menu = getSession('menuList')
  let currentMenu
  for (let i = 0, len = menu.length; i < len; i++) {
    s(name, menu[i], false, currentMenu)
  }
  console.log(currentMenu)
  function s (name, data, status, currentMenu) {
    for (let i = 0, len = data.length; i < len; i++) {
      console.log(data[i].filename, name)
      if (data[i].filename === name) {
        console.log(11, data[i].filename)
        currentMenu = data[i]
        break
      } else {
        if (status) break
        if (data[i].children && data[i].children.length > 0) {
          s(name, data[i].children)
        }
      }
    }
  }
}
