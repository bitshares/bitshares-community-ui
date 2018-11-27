const types = {
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR'
}

const state = {
  searchStr: ''
}

const getters = {
  getSearchStr(state) {
    return state.searchStr
  },
  getFillOrderInfo: (state, getters, rootState, rootGetters) => (order) => {
    const { payload, buyer, date } = order
    const type = buyer ? 'buy' : 'sell'
    const assetPays = rootGetters['assets/getAssetById'](payload.pays.asset_id)
    const assetReceives = rootGetters['assets/getAssetById'](payload.receives.asset_id)
    const amountPays = payload.pays.amount / 10 ** assetPays.precision
    const amountReceives = payload.receives.amount / 10 ** assetReceives.precision
    const amountPaysForAvg = payload['fill_price'].base.amount / 10 ** assetReceives.precision
    const amountReceivesForAvg = payload['fill_price'].quote.amount / 10 ** assetPays.precision

    const price = buyer ? amountPays / amountReceives : amountReceives / amountPays
    const avg = buyer ? amountReceivesForAvg / amountPaysForAvg : amountPaysForAvg / amountReceivesForAvg

    return {
      payAssetSymbol: assetPays.symbol,
      receiveAssetSymbol: assetReceives.symbol,
      get: amountReceives.toFixed(8).replace(/\.?0+$/, ''),
      spend: amountPays.toFixed(8).replace(/\.?0+$/, ''),
      price: price.toFixed(5),
      avg: avg.toFixed(5),
      order: type,
      dateClose: date,
      dateOpen: date
    }
  },
  getHistoryList: (state, getters, rootState, rootGetters) => {
    const operations = rootGetters['operations/getOperations']
    const fillOrders = operations.filter(operation => operation.type === 'fill_order')
    const list = fillOrders.map(order => getters.getFillOrderInfo(order))

    return list
  }
}

const mutations = {
  [types.UPDATE_SEARCH_STR](state, value) {
    state.searchStr = value
  }
}

const actions = {
  changeSearchStr({ commit }, value) {
    commit(types.UPDATE_SEARCH_STR, value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
