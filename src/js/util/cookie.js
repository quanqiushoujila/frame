export function getCookie (name) {
  var arr = document.cookie.replace(/\s/g, '').split(';')
  for (var i = 0, len = arr.length; i < len; i++) {
    var arrTemp = arr[i].split('=')
    if (arrTemp[0] === name) {
      return decodeURIComponent(arrTemp[1])
    }
  }
  return ''
}

export function setCookie (name, value, days) {
  days = days || 7
  var data = new Data()
  date.setDate(date.getDate() + days)
  document.cookie = name + '=' + value + ';expires=' + data
}

export function removeCookie (name) {
  setCookie(name, 1, -1)
}