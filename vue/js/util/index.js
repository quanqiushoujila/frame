function getCookie (name) {
  var arr = document.cookie.replace(/\s/g, '').split(';')
  for (var i = 0, len = arr.length; i < len; i++) {
    var arrTemp = arr[i].split('=')
    if (arrTemp[0] === name) {
      return decodeURIComponent(arrTemp[1])
    }
  }
  return ''
}

function setCookie (name, value, days) {
  days = days || 7
  var data = new Data();
  date.setDate(date.getDate() + days);
  document.cookie = name + '=' + value + ';expires=' + data;
}

function removeCookie (name) {
  setCookie(name, 1, -1)
}

function setSessionStorage (key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getSessionStorage (key) {
  return sessionStorage.getItem(key)
}

function removeSessionStorage (key) {
  return sessionStorage.removeItem(key)
}
// 接口
var api = function (obj) {
  obj.data || obj.data || {}
  $.ajax({
    xhrFields: {
      withCredentials: true
    },
    // crossDomain: true,
    type: obj.type || 'get',
    url: CONFIG.BASE_URL + obj.url,
    dataType: obj.dataType || 'json',
    data: obj.data,
    contentType: obj.contentType ? obj.contentType : (obj.dataType && obj.dataType === 'json' ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded; charset=utf-8'),
    success: function (res) {
      if (res.code === 0) {
        obj.successFuc && obj.successFuc(res)
      } else {
        obj.failFuc && obj.failFuc(res)
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      /*弹出jqXHR对象的信息*/
      console.log('responseText', jqXHR.responseText);
      console.log('status', jqXHR.status);
      console.log('readyState', jqXHR.readyState);
      console.log('statusText', jqXHR.statusText);
      /*弹出其他两个参数的信息*/
      console.log('textStatus', textStatus);
      console.log('errorThrown', errorThrown);
      obj.errorFuc && obj.errorFuc()
    }
  })
}

// 公共参数
var CONFIG = {
  BASE_URL: 'http://123.com', // api路劲
  SUCCESS: 0, // ajax成功 code: 0
  ERROR: 1, // ajax失败 code: 1
  DETAIL: '详情',
  EDIT: '编辑',
  ADD: '新增',
  ADDCHILD: '添加子级菜单'
}
var menuList = []
var tabList = [];
var defaultActive;

/**
 * 邮箱
 * @param {*} s
 */
function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 数字
 * @param {*} s
 */
function isNumber (s) {
  return /\d+/.test(s)
}

/**
 * 英文和数字
 * @param {*} s
 */
function isEnglishAndNumber (s) {
  return /^[A-Za-z0-9]+$/.test()
}

/**
 * 汉字
 * @param {*} s
 */
function isChinese (s) {
  return /^[\u4e00-\u9fa5]{0,}$/.test(s)
}

/**
 * 数字、26个英文字母或者下划线
 * @param {*} s
 */
function isNormal (s) {
  return /^\w+$/.test(s)
}

/**
 * 正数、和小数
 * @param {*} s
 */
function isN (s) {
  return /^\d+(\.\d+)?$/.test(s)
}


function isBoolean (value) {
  return $.type(value) === 'boolean'
}
function isArray (value) {
  return $.type(value) === 'array'
}
function isNumber (value) {
  return $.type(value) === 'number'
}
function isString (value) {
  return $.type(value) === 'string'
}
function isObject (value) {
  return $.type(value) === 'object'
}
function isEmptyObject(obj) {
  if (!obj || 'object' !== typeof obj && 'function' === typeof obj || obj instanceof Array)
    return false
  return !Object.keys(obj).length
}
function isEmpty (value) {
  return value === '' || (isArray(value) && value.length > 0) || (isObject(value) || isEmptyObject(value))
}
function clonedeep (values) {
  var copy
  if (null || 'object' != typeof values) return values

  if (values instanceof Date) {
    copy = new Date()
    copy.setTime(values.getTime())
    return copy
  }

  if (values instanceof Array) {
    copy = []
    for (var i = 0, len = values.length; i < len; i++) {
      copy[i] = clonedeep(values[i])
    }
    return copy
  }

  if (values instanceof Object) {
    copy = {}
    for (var attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = clonedeep(values[attr])
    }
    return copy
  }

  throw new Error('值类型不正确')
}

function toggleDisabled (data, hasDisabled) {
  var d = clonedeep(data)
  disabled(d, hasDisabled)
  return d
}

function disabled (data, hasDisabled) {
  if (hasDisabled) {
    for (var i = 0, len = data.length; i < len; i++) {
      if (!data[i].hasOwnProperty('disabled')) {
        data[i].disabled = true
        if (data[i].children && data[i].children.length > 0) {
          disabled(data[i].children, hasDisabled)
        }
      }
    }
  } else {
    for (var i = 0, len = data.length; i < len; i++) {
      if (data[i].hasOwnProperty('disabled')) {
        delete data[i].disabled
        if (data[i].children && data[i].children.length > 0) {
          disabled(data[i].children, hasDisabled)
        }
      }
    }
  }
}

function resetObject (data) {
  for (var key in data) {
    var val = data[key]
    if (isObject(val)) {
      data[key] = {}
    } else if (isArray(val)) {
      data[key] = []
    } else {
      data[key] = ''
    }
  }
  return data
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
function treeDataTranslate (data, expanded, id, pid) {
  expanded = expanded != null ? expanded : false
  id = id ? id : 'id'
  pid = pid ? pid : 'parentId'
  let res = []
  getData(data)
  function getData (data) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (data[i].level > 1) {
        data[i]['_show'] = expanded
      } else {
        data[i]['_show'] = true
      }
      data[i]['_expanded'] = expanded
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

// 读取session字典数据
function getDicData (name, word) {
  var data = getSessionStorage(name)
  return data[word]
}
