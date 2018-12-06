import { removePrefix } from '@/helpers/utils'

const types = {
  SET_TYPE: 'SET_TYPE',
  SET_ACTIVE_PERCENT: 'SET_ACTIVE_PERCENT',
  SET_ACTIVE_INDICATION: 'SET_ACTIVE_INDICATION',
  SET_MARKET: 'SET_MARKET',
  SET_GET_AMOUNT: 'SET_GET_AMOUNT',
  SET_SPEND_AMOUNT: 'SET_SPEND_AMOUNT',
  RESET: 'RESET'
}

const getDefaultState = () => ({
  base: 'BTC',
  quote: 'USD',
  marketSellPrice: 5610.02,
  marketBuyPrice: 5611.15,
  orderAmount: 0.02,
  getAmount: 0,
  spendAmount: 0,
  type: 'buy',

  activeIndication: 'MARKET',
  activePercent: 0,
  percentItems: [10, 25, 50, 75]
})

const getters = {
  getBase: state => removePrefix(state.base),
  getQuote: state => removePrefix(state.quote),
  getMarketSellPrice: state => state.marketSellPrice,
  getMarketBuyPrice: state => state.marketBuyPrice,
  getOrderAmount: state => state.orderAmount,
  getType: state => state.type,
  getPercentItems: state => state.percentItems,
  getActivePercent: state => state.activePercent,
  getActiveIndication: state => state.activeIndication,
  getSpendAmount: state => state.spendAmount,
  getGetAmount: state => state.getAmount
}

const mutations = {
  [types.SET_TYPE](state, tab) {
    state.type = tab
  },
  [types.SET_ACTIVE_PERCENT](state, percent) {
    state.activePercent = percent
  },
  [types.SET_ACTIVE_INDICATION](state, indication) {
    state.activeIndication = indication
  },
  [types.SET_MARKET](state, { base, quote }) {
    state.base = base
    state.quote = quote
  },
  [types.SET_GET_AMOUNT](state, value) {
    state.getAmount = value
  },
  [types.SET_SPEND_AMOUNT](state, value) {
    state.spendAmount = value
  }
}

const actions = {
  setType({ commit }, tab) {
    commit(types.SET_TYPE, tab)
  },
  setMarket({ commit }, { base, quote }) {
    commit(types.SET_MARKET, { base, quote })
  },
  setActivePercent({ commit }, percent) {
    commit(types.SET_ACTIVE_PERCENT, percent)
  },
  setActiveIndication({ commit }, indication) {
    commit(types.SET_ACTIVE_INDICATION, indication)
  },
  setGetAmount({ commit }, value) {
    commit(types.SET_GET_AMOUNT, value)
  },
  setSpendAmount({ commit }, value) {
    commit(types.SET_SPEND_AMOUNT, value)
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
  actions,
  getters
}
