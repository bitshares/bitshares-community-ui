const types = {
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR'
}

const state = {
  searchStr: '',
  history: [
    {
      base: 'BTC',
      ticker: 'USD',
      dateOpen: '02/11',
      timeOpen: '15:46',
      dateClose: '03/11',
      timeClose: '1:20',
      price: 6480,
      get: 312,
      spend: 0.048
    },
    {
      base: 'BTS',
      ticker: 'ETH',
      dateOpen: '01/11',
      timeOpen: '10:12',
      dateClose: '02/11',
      timeClose: '11:08',
      price: 0.00048,
      priceVol: 656535,
      get: 20.5010,
      getVol: 4832,
      spend: 0.00997,
      spendVol: 4589675
    },
    {
      base: 'LTC',
      ticker: 'ETH',
      dateOpen: '28/10',
      timeOpen: '10:12',
      dateClose: '28/10',
      timeClose: '11:08',
      price: 0.06891,
      priceVol: 0.48378,
      get: 1.23520,
      getVol: 0.48378,
      spend: 2.24
    },
    {
      base: 'LTC',
      ticker: 'ETH',
      dateOpen: '27/10',
      timeOpen: '10:12',
      dateClose: '27/10',
      timeClose: '11:08',
      price: 0.01255,
      priceVol: 0.48378,
      get: 1.23520,
      getVol: 0.48378,
      spend: 2.24
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
    return fillOrders
  },
  getHistory(state) {
    // more data, for scroll test
    return state.history
      .concat(state.history)
      .concat(state.history)
      .concat(state.history)
      .concat(state.history)
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
