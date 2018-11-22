// util functions should go here

// convert sum to currency format, exapmle: 1 000 000 (use in markets)
export const getVolumeFormat = sum => sum < 1 ? sum : sum.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')

export const removePrefix = (string, prefix) => {
  let trimmed = string
  if (string.substring(0, prefix.length) === prefix) trimmed = string.slice(prefix.length)
  return trimmed
}

// converts amount to shortened format
export const amountValueShortener = amount => {
  let valuesToSymbols = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: 'k' },
    { value: 1E6, symbol: 'm' }
  ]
  let regex = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = valuesToSymbols.length - 1; i > 0; i--) {
    if (amount >= valuesToSymbols[i].value) {
      break
    }
  }
  return (amount / valuesToSymbols[i].value).toFixed(1).replace(regex, '$1') + valuesToSymbols[i].symbol
}

// get max value from array[{}, {}, {}]
export const getMaxSum = (items, field) => {
  return Math.max.apply(null, items.map(item => item[field]))
}

// short float currency
export const getFloatCurrency = (n) => {
  const value = n.toString().replace(/0+$/, '')

  if (value[0] === '0' && value.length > 9) return value.slice(1, 10)
  return value.slice(0, 9)
}
