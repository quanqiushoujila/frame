// url参数转对象
export function parseQueryString (url) {
  url = url || window.location.href
  let search = url.slice(url.indexOf('?') + 1)
  if (!search) {
    return {}
  }
  return JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`)
}
