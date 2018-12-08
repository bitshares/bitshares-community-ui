import config from '@/config'

const getters = {
  // gets base value based on last history price
  getBalanceBaseValue: (state, getters, rootState, rootGetters) => ({ assetId, value }) => {
    const history24 = rootGetters['history/getByDay'](1)[assetId]
    const history7 = rootGetters['history/getByDay'](7)[assetId]
    if (!history24 || !history7) return 0
    let price = history24.last || history7.last || 0
    if (assetId === state.baseId) price = 1
    const baseValue = parseInt((value * price).toFixed(0), 10)

    return baseValue
  },

  getTotalBaseValue: (state, getters, rootState, rootGetters) => {
    const balances = rootGetters['acc/getUserBalances']
    return Object.keys(balances).reduce((result, assetId) => {
      return result + getters.getBalanceBaseValue({ assetId, value: balances[assetId].balance })
    }, 0)
  },

  getTotalFiatValue: (state, getters) => {
    return getters.getBalanceFiatValue(getters.getTotalBaseValue)
  },

  getBalanceFiatValue: (state, getters, rootState, rootGetters) => (baseValue) => {
    const multiplier = rootGetters['history/getHistoryAssetMultiplier'](1, state.fiatId).last
    // const multiplier7 = rootGetters['history/getHistoryAssetMultiplier'](7, state.fiatId).last
    const fiatValue = parseFloat((baseValue * multiplier).toFixed(0), 10)
    const fiatAsset = rootGetters['assets/getAssetById'](state.fiatId)
    return fiatValue / (10 ** fiatAsset.precision)
  },

  getBalanceBtcValue: (state, getters, rootState, rootGetters) => (baseValue) => {
    const multiplier = rootGetters['history/getHistoryAssetMultiplier'](1, '1.3.861').last
    const btcValue = parseFloat((baseValue * multiplier).toFixed(0), 10)
    const btcAsset = rootGetters['assets/getAssetById']('1.3.861')
    return btcValue / (10 ** btcAsset.precision)
  },

  getPriceChangeById: (state, getters, rootState, rootGetters) => ({ days, assetId }) => {
    const multiplier = rootGetters['history/getHistoryAssetMultiplier'](1, state.fiatId)
    const prices = rootGetters['history/getByDay'](days)[assetId]
    if (!multiplier || !prices) return 0
    if (prices.first === prices.last) return 0
    return ((((prices.last * multiplier.last) /
      (prices.first * multiplier.first)) * 100) - 100)
  },

  getItems: (state, getters, rootState, rootGetters) => {
    const balances = rootGetters['acc/getUserBalances']

    const items = Object.keys(balances).map(assetId => {
      const balance = balances[assetId].balance
      const asset = rootGetters['assets/getAssetById'](assetId)

      const tokens = balance / 10 ** asset.precision
      const baseValue = getters.getBalanceBaseValue({ assetId, value: balance })
      const fiatValue = getters.getBalanceFiatValue(baseValue)
      const btcValue = getters.getBalanceBtcValue(baseValue / tokens)
      const tokenPrice = fiatValue / tokens
      const change7 = getters.getPriceChangeById({ assetId, days: 7 })
      const change1 = getters.getPriceChangeById({ assetId, days: 1 })

      const share = Math.round((baseValue / getters.getTotalBaseValue) * 100)
      return {
        assetId,
        tiker: asset.symbol,
        tokens,
        fiatValue,
        btcValue,
        baseValue,
        share,
        tokenPrice,
        change7,
        change1
      }
    })

    return items
  },

  getTokensByAsset: (state, getters) => assetName => {
    const balanceObject = getters.getItems.find(item => item.tiker === assetName)
    console.log(getters.getItems, balanceObject)
    return balanceObject ? balanceObject.tokens : 0
  },

  fiatId: state => state.fiatId
}

export default {
  namespaced: true,
  state: {
    fiatId: config.fiatId,
    baseId: config.baseId
  },
  mutations: {},
  actions: {},
  getters
}
