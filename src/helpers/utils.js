// util functions should go here
export const getVolumeFormat = sum => sum.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
export const sortByField = (field) => {
  let sortOrder = 1

  if (field[0] === '-') {
    sortOrder = -1
    field = field.slice(1)
  }
  return (a, b) => {
    const result = (a[field] < b[field]) ? -1 : (a[field] > b[field]) ? 1 : 0
    return result * sortOrder
  }
}
