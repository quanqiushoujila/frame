/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 数字
 * @param {*} s
 */
export function isNumber (s) {
  return /\d+/.test(s)
}

/**
 * 英文和数字
 * @param {*} s
 */
export function isEnglishAndNumber (s) {
  return /^[A-Za-z0-9]+$/.test()
}

/**
 * 汉字
 * @param {*} s
 */
export function isChinese (s) {
  return /^[\u4e00-\u9fa5]{0,}$/.test(s)
}

/**
 * 数字、26个英文字母或者下划线
 * @param {*} s
 */
export function isNormal (s) {
  return /^\w+$/.test(s)
}

/**
 * 正数、和小数
 * @param {*} s
 */
export function isN (s) {
  return /^\d+(\.\d+)?$/.test(s)
}
