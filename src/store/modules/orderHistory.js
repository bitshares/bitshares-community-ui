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
  getHistoryList: (state, getters, rootState, rootGetters) => {
    const operations = rootGetters['operations/getOperations']
    const fillOrders = operations.filter(operation => operation.type === 'fill_order')

    // calc needed data here

    return fillOrders
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
