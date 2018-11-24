const types = {
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR',
  UPDATE_ACTIVE_LIST: 'UPDATE_ACTIVE_LIST'
}

const state = {
  searchStr: '',
  isFetching: false,
  activeList: [
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'buy',
      payAssetSymbol: 'BTS',
      avg: 1.3531,
      price: 1.1231,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'sell',
      payAssetSymbol: 'BTS',
      avg: 1.318,
      price: 1.912,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'buy',
      payAssetSymbol: 'BTS',
      avg: 1.35000,
      price: 1.50000,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'buy',
      payAssetSymbol: 'BTS',
      avg: 1.319,
      price: 1.671,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'sell',
      payAssetSymbol: 'BTS',
      avg: 1.3500,
      price: 1.500,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'buy',
      payAssetSymbol: 'BTS',
      avg: 2.353184,
      price: 2.5120,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'buy',
      payAssetSymbol: 'BTS',
      avg: 1.35319,
      price: 1.53182,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'sell',
      payAssetSymbol: 'BTS',
      avg: 1.35232,
      price: 1.531931,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    }
  ]
}

const getters = {
  getSearchStr(state) {
    return state.searchStr
  },
  isFetching(state) {
    return state.isFetching
  },
  getActiveList: (state, getters, rootState, rootGetters) => {
    // now its demo case for activeOrders test
    return state.activeList.map(listItem => Object.assign(
      {},
      listItem,
      { filled: Math.round(Math.random() * 100) }
    ))
  }
}

const mutations = {
  [types.UPDATE_SEARCH_STR](state, value) {
    state.searchStr = value
  },
  [types.UPDATE_ACTIVE_LIST](state, list) {
    state.activeList = list
  }
}

const actions = {
  changeSearchStr({ commit }, value) {
    commit(types.UPDATE_SEARCH_STR, value)
  },
  removeActiveOrder({ commit, state }, ndx) {
    commit(types.UPDATE_ACTIVE_LIST, state.activeList.filter((order, index) => ndx !== index))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
