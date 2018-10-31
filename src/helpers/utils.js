// util functions should go here

// convert sum to currency format, exapmle: 1 000 000 (use in markets)
export const getVolumeFormat = sum => sum.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
