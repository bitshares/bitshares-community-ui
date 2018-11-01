// util functions should go here

// convert sum to currency format, exapmle: 1 000 000 (use in markets)
export const getVolumeFormat = sum => sum.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')

// converts amount to shortened format
export const amountValueShortener = amount => {
  let data = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: 'k' },
    { value: 1E6, symbol: 'm' }
  ]
  let regex = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = data.length - 1; i > 0; i--) {
    if (amount >= data[i].value) {
      break
    }
  }
  return (amount / data[i].value).toFixed(1).replace(regex, '$1') + data[i].symbol
}
