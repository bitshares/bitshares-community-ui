const types = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_ACTIVE_PERCENT: 'SET_ACTIVE_PERCENT',
  SET_ACTIVE_INDICATION: 'SET_ACTIVE_INDICATION'
}

const getDefaultState = () => ({
  base: 'BTC',
  quote: 'USD',
  marketSellPrice: 5610.02,
  marketBuyPrice: 5611.15,
  orderAmount: 0.02,
  type: 'buy',
  activeTab: 'buy',

  activeIndication: 'MARKET',
  activePercent: 10,
  percents: [10, 25, 50, 75]
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
  },
  getPercents(state) {
    return state.percents
  },
  getActivePercent(state) {
    return state.activePercent
  },
  getActiveIndication(state) {
    return state.activeIndication
  }
}

const mutations = {
  [types.SET_ACTIVE_TAB](state, tab) {
    state.activeTab = tab
  },
  [types.SET_ACTIVE_PERCENT](state, percent) {
    state.activePercent = percent
  },
  [types.SET_ACTIVE_INDICATION](state, indication) {
    state.activeIndication = indication
  }
}

const actions = {
  setActiveTab({ commit }, tab) {
    commit(types.SET_ACTIVE_TAB, tab)
  },
  setActivePercent({ commit }, percent) {
    commit(types.SET_ACTIVE_PERCENT, percent)
  },
  setActiveIndication({ commit }, indication) {
    commit(types.SET_ACTIVE_INDICATION, indication)
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
  actions,
  getters
}
