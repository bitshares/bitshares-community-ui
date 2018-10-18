
const getters = {
  // gets base value based on last history price
  getBalanceBaseValue: (state, getters, rootState, rootGetters) => ({ assetId, value }) => {
    const history24 = rootGetters['history/getByDay'](1)[assetId]
    const history7 = rootGetters['history/getByDay'](7)[assetId]
    const price = (history24 && history24.last) || (history7 && history7.last)
    const baseValue = parseInt((value * price).toFixed(0), 10)

    return baseValue
  },

  getTotalBaseValue: (state, getters, rootState, rootGetters) => {
    const balances = rootGetters['acc/getUserBalances']
    return Object.keys(balances).reduce((result, assetId) => {
      return result + getters.getBalanceBaseValue({ assetId, value: balances[assetId].balance })
    }, 0)
  },

  getBalanceFiatValue: (state, getters, rootState, rootGetters) => (baseValue) => {
    const multiplier = rootGetters['history/getHistoryAssetMultiplier'](1, state.fiatId).last
    const fiatValue = parseInt((baseValue * multiplier).toFixed(0), 10)
    const fiatAsset = rootGetters['assets/getAssetById'](state.fiatId)
    return fiatValue / (10 ** fiatAsset.precision)
  },

  getItems: (state, getters, rootState, rootGetters) => {
    const balances = rootGetters['acc/getUserBalances']

    const items = Object.keys(balances).map(assetId => {
      const balance = balances[assetId].balance
      const asset = rootGetters['assets/getAssetById'](assetId)

      const tokens = balance / 10 ** asset.precision
      const baseValue = getters.getBalanceBaseValue({ assetId, value: balance })
      const fiatValue = getters.getBalanceFiatValue(baseValue)
      const share = Math.round((baseValue / getters.getTotalBaseValue) * 100)
      return {
        tiker: asset.symbol,
        tokens,
        fiatValue,
        share
      }
    })

    return items
  },

  fiatId: state => state.fiatId
}

export default {
  namespaced: true,
  state: {
    fiatId: '1.3.121'
  },
  mutations: {},
  actions: {},
  getters
}
