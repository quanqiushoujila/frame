export function getDate (time) {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth().padStart(2, '0')
  const d = date.getDate().padStart(2, '0')
  return `${y}-${m}-${d}`
}
