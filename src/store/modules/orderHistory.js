const types = {
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR'
}

const state = {
  searchStr: '',
  history: [
    {
      base: 'BTC',
      ticker: 'USD',
      dateOpen: 1541696933000,
      dateClose: 1541703771000,
      price: 6480,
      get: 312,
      spend: 0.048,
      order: 'sell'
    },
    {
      base: 'BTS',
      ticker: 'ETH',
      dateOpen: 1541667771000,
      dateClose: 1541668071000,
      price: 0.00048,
      get: 20.5010,
      spend: 0.00997,
      order: 'buy'
    },
    {
      base: 'LTC',
      ticker: 'ETH',
      dateOpen: 1541578071000,
      dateClose: 1541584971000,
      price: 0.06891,
      get: 1.23520,
      spend: 2.24,
      order: 'buy'
    },
    {
      base: 'LTC',
      ticker: 'ETH',
      dateOpen: 1541527371000,
      dateClose: 1541527551000,
      price: 0.01255,
      get: 1.23520,
      spend: 2.24,
      order: 'sell'
    }
  ]
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
    const price = buyer ? amountPays / amountReceives : amountReceives / amountPays
    return {
      base: assetPays.symbol,
      ticker: assetReceives.symbol,
      get: amountReceives,
      spend: amountPays,
      price: price.toFixed(5),
      order: type,
      dateClose: date,
      dateOpen: date
    }
  },
  getHistoryList: (state, getters, rootState, rootGetters) => {
    const operations = rootGetters['operations/getOperations']
    const fillOrders = operations.filter(operation => operation.type === 'fill_order')

    const list = fillOrders.map(order => getters.getFillOrderInfo(order))
    // calc needed data here

    return list
  },
  getHistory(state) {
    return state.history
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
