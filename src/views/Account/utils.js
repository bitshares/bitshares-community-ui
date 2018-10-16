/**
 * Returns amount of change by percent, calculated by prices history and exchange multiplier
 * @param {Object} object.prices - object with asset's history prices
 * @param {number} object.prices.first - first price of asset history
 * @param {number} object.prices.last - last price of asset history (current)
 * @param {Object} object.multiplier - object with base -> fiat exchange rates
 * @param {number} object.multiplier.first - multiplier for first history price
 * @param {number} object.multiplier.last - multiplier for last history price (current)
 */
export const calcPercentChange = (prices, multiplier) => {
  return ((((prices.last * multiplier.last) /
    (prices.first * multiplier.first)) * 100) - 100)
};

export const calcPortfolioItem = ({
  asset,
  history24,
  history7,
  baseAsset,
  fiatMultiplier,
  marketPrice,
  balance }) => {
  const multiplier = fiatMultiplier

  const price = marketPrice || history24.last || history7.last

  const baseValue = parseInt((balance * price).toFixed(0), 10)

  const baseValuePrecised = baseValue / (10 ** baseAsset.precision)

  const fiatValue = parseInt((baseValue * fiatMultiplier.last).toFixed(0), 10)

  let change24 = calcPercentChange(history24, multiplier)
  if (history24.fist === history24.last && asset.id !== baseAsset.id) change24 = 0

  let change7 = calcPercentChange(history7, multiplier)
  if (history7.fist === history7.last && asset.id !== baseAsset.id) change7 = 0

  return {
    name: asset.symbol,
    balance,
    baseValue,
    baseValuePrecised,
    basePrecision: baseAsset.precision,
    fiatValue,
    change24,
    change7,
    price
  }
};
