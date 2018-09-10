export function setSession (key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function getSession (key) {
  return JSON.parse(sessionStorage.getItem(key))
}

export function removeSession (key) {
  return sessionStorage.removeItem(key)
}
