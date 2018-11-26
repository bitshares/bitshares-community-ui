const types = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB'
}

const getDefaultState = () => ({
  base: 'BTC',
  quote: 'USD',
  marketSellPrice: 5610.02,
  marketBuyPrice: 5611.15,
  orderAmount: 0.02,
  type: 'buy',
  activeTab: 'buy'
})

const getters = {
  getCurrentBase(state) {
    return state.base
  },
  getQuote(state) {
    return state.quote
  },
  getMarketSellPrice(state) {
    return state.marketSellPrice
  },
  getMarketBuyPrice(state) {
    return state.marketBuyPrice
  },
  getOrderAmount(state) {
    return state.orderAmount
  },
  getType(state) {
    return state.type
  },
  getActiveTab(state) {
    return state.activeTab
  }
}

const mutations = {
  [types.SET_ACTIVE_TAB](state, tab) {
    state.activeTab = tab
  }
}

const actions = {
  setActiveTab({ commit }, tab) {
    commit(types.SET_ACTIVE_TAB, tab)
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
  actions,
  getters
}
