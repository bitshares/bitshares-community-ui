// util functions should go here

// convert sum to currency format, exapmle: 1 000 000 (use in markets)
export const getVolumeFormat = sum => sum.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')

// receives field and sorts in the direct and reverse order (use in markets)
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
