// util functions should go here
export const getVolumeFormat = sum => sum.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
