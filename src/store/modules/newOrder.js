import { removePrefix } from '@/helpers/utils'
import API from 'vuex-bitshares/src/services/api'
import Vue from 'vue'

const types = {
  SET_TYPE: 'SET_TYPE',
  SET_ACTIVE_PERCENT: 'SET_ACTIVE_PERCENT',
  SET_ACTIVE_INDICATION: 'SET_ACTIVE_INDICATION',
  SET_MARKET: 'SET_MARKET',
  SET_BASE_AMOUNT: 'SET_BASE_AMOUNT',
  SET_QUOTE_AMOUNT: 'SET_QUOTE_AMOUNT',
  SET_PRICE: 'SET_PRICE',
  RESET: 'RESET',
  RESET_AMOUNTS: 'RESET_AMOUNTS',
  PLACE_ORDER_REQUEST: 'ORDER_PLACE_REQUEST',
  PLACE_ORDER_COMPLETE: 'ORDER_PLACE_COMPLETE',
  SHOW_CONFIRM: 'SHOW_CONFIRM',
  HIDE_CONFIRM: 'HIDE_CONFIRM'
}

const getDefaultState = () => ({
  base: '',
  quote: '',
  price: null,
  type: 'buy',
  activeIndication: 'MARKET',
  activePercent: 0,
  percentItems: [10, 25, 50, 75],
  inProgress: false,
  showConfirm: false,

  baseAmount: null,
  quoteAmount: null
})

const getters = {
  getBase: state => removePrefix(state.base),
  getQuote: state => removePrefix(state.quote),
  getMarketPrices: (state, getters, rootState, rootGetters) => rootGetters['orderBook/getTopOrders'],
  getType: state => state.type,
  isBuyOrder: state => state.type === 'buy',
  getBaseAmount: state => state.baseAmount,
  getQuoteAmount: state => state.quoteAmount,
  getPercentItems: state => state.percentItems,
  getActivePercent: state => state.activePercent,
  getActiveIndication: state => state.activeIndication,
  getPrice: state => state.price,
  getFiatPrice: (state, getters, rootState, rootGetters) => {

    // calc usd price based on asset
  },
  getMaxBase: (state, getters, rootState, rootGetters) => {
    return rootGetters['portfolio/getTokensByAsset'](state.base)
  },
  getMaxQuote: (state, getters, rootState, rootGetters) => {
    return rootGetters['portfolio/getTokensByAsset'](state.quote)
  },
  inProgress: state => state.inProgress,
  confirmDisplayed: state => state.showConfirm
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
  [types.SET_BASE_AMOUNT](state, value) {
    state.baseAmount = value
  },
  [types.SET_QUOTE_AMOUNT](state, value) {
    state.quoteAmount = value
  },
  [types.SET_PRICE](state, value) {
    state.price = value
  },
  [types.RESET](state) {
    Object.assign(state, getDefaultState())
  },
  [types.RESET_AMOUNTS](state) {
    state.baseAmount = null
    state.quoteAmount = null
    state.price = null
  },
  [types.PLACE_ORDER_REQUEST](state) {
    state.inProgress = true
  },
  [types.PLACE_ORDER_COMPLETE](state) {
    state.inProgress = false
  },
  [types.SHOW_CONFIRM](state) {
    state.showConfirm = true
  },
  [types.HIDE_CONFIRM](state) {
    state.showConfirm = false
  }
}

const actions = {
  setType({ commit }, tab) {
    commit(types.SET_TYPE, tab)
  },
  setMarket({ commit }, { base, quote }) {
    commit(types.RESET)
    commit(types.SET_MARKET, { base, quote })
  },
  setActivePercent({ commit }, percent) {
    commit(types.SET_ACTIVE_PERCENT, percent)
  },
  setActiveIndication({ commit }, indication) {
    commit(types.SET_ACTIVE_INDICATION, indication)
  },
  showConfirm({ commit }) {
    commit(types.SHOW_CONFIRM)
  },
  hideConfirm({ commit }) {
    commit(types.HIDE_CONFIRM)
  },
  setBaseAmount({ state, commit }, value) {
    commit(types.SET_BASE_AMOUNT, value)
    if (state.price && value) {
      commit(types.SET_QUOTE_AMOUNT, value / state.price)
    }
    if (state.quoteAmount && value && !state.price) {
      commit(types.SET_PRICE, value / state.quoteAmount)
    }
  },
  setQuoteAmount({ state, commit }, value) {
    commit(types.SET_QUOTE_AMOUNT, value)
    if (state.price && value) {
      commit(types.SET_BASE_AMOUNT, value * state.price)
    }
    if (state.baseAmount && value && !state.price) {
      commit(types.SET_PRICE, state.baseAmount / value)
    }
  },
  setPrice({ commit, state }, value) {
    commit(types.SET_PRICE, value)

    if (state.type === 'buy') {
      if (state.quoteAmount) commit(types.SET_BASE_AMOUNT, state.quoteAmount * value)
    } else {
      if (state.baseAmount) commit(types.SET_QUOTE_AMOUNT, state.baseAmount / value)
    }
  },
  setOrderData({ commit, state }, { type, price, sum }) {
    actions.setPrice({ commit, state }, price)
    if (!state.baseAmount) actions.setBaseAmount({ commit, state }, sum)
  },
  async dispatchOrder({ commit, state, rootGetters }) {
    const baseAsset = rootGetters['assets/getAssetBySymbol'](state.base)
    const quoteAsset = rootGetters['assets/getAssetBySymbol'](state.quote)
    const baseAmount = state.baseAmount * 10 ** baseAsset.precision
    const quoteAmount = state.quoteAmount * 10 ** quoteAsset.precision
    const get = state.type === 'buy' ? baseAmount : quoteAmount
    const spend = state.type === 'buy' ? quoteAmount : baseAmount

    const market = API.Market(baseAsset)
    if (market) {
      const sides = market.getOrderSides({
        type: state.type === 'sell' ? 'get' : 'spend',
        asset: quoteAsset,
        spend,
        get
      })
      console.log(sides)
      const userId = rootGetters['acc/getAccountUserId']
      const newOrder = API.Transactions.createOrder(sides, userId)
      console.log(newOrder)
      const keys = rootGetters['acc/getKeys']
      commit(types.PLACE_ORDER_REQUEST)
      const result = await API.Transactions.placeOrder(newOrder, keys)
      commit(types.PLACE_ORDER_COMPLETE)
      console.log(result)
      commit(types.HIDE_CONFIRM)
      if (result.success) {
        Vue.prototype.$toast.success('Order placed')
      } else {
        Vue.prototype.$toast.error('Error when placing order: ' + result.error)
      }
    } else {
      console.warn('No Market: ', baseAsset.symbol)
      // todo: noty error
    }
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
  actions,
  getters
}
