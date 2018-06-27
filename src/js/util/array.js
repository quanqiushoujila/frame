/**
 * [arrayEqual 判断两组数组是否相同]
 * @param  {Array} arr1
 * @param  {Array} arr2
 * @return {Boolean}
 */

export function arrayEqual(arr1, arr2) {
  if (arr1 === arr2) {
    return true
  }
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0, len = arr1.length; i < len; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

/**
 * [去除数组中重复内容]
 * @param  {Array} arr
 * @return {Array}
 */
export function unique(arr) {
  let res = array.filter(function(item, index, array) {
    return array.indexOf(item) === index
  })
  return res
}
/**
 * [去除数组中重复内容并排序]
 * @param  {Array} arr
 * @return {Array}
 */
export function uniqueSort(arr) {
  let res = array.concat().sort().filter(function(item, index, array) {
    return array.indexOf(item) === index
  })
  return res
}

/**
 * [求最大数]
 * @param  {Array} arr
 * @return {String}
 */
export function max(arr) {
  return arr.sort()[arr.length - 1]
}
/**
 * [求最小数]
 * @param  {Array} arr
 * @return {String}
 */
export function min(arr) {
  return arr.sort()[0]
}
