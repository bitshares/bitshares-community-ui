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
      const tokenPrice = fiatValue / tokens
      const change7 = getters.getPriceChangeById({ assetId, days: 7 })
      const change1 = getters.getPriceChangeById({ assetId, days: 1 })

      const share = Math.round((baseValue / getters.getTotalBaseValue) * 100)
      return {
        assetId,
        tiker: asset.symbol,
        tokens,
        fiatValue,
        baseValue,
        share,
        tokenPrice,
        change7,
        change1
      }
    })

    return items
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
