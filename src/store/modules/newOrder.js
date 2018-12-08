import { removePrefix } from '@/helpers/utils'
import API from 'vuex-bitshares/src/services/api'
import Vue from 'vue'

const types = {
  SET_TYPE: 'SET_TYPE',
  SET_ACTIVE_PERCENT: 'SET_ACTIVE_PERCENT',
  SET_ACTIVE_INDICATION: 'SET_ACTIVE_INDICATION',
  SET_MARKET: 'SET_MARKET',
  SET_GET_AMOUNT: 'SET_GET_AMOUNT',
  SET_SPEND_AMOUNT: 'SET_SPEND_AMOUNT',
  SET_PRICE: 'SET_PRICE',
  RESET: 'RESET',
  RESET_AMOUNTS: 'RESET_AMOUNTS',
  PLACE_ORDER_REQUEST: 'ORDER_PLACE_REQUEST',
  PLACE_ORDER_COMPLETE: 'ORDER_PLACE_COMPLETE',
  SHOW_CONFIRM: 'SHOW_CONFIRM',
  HIDE_CONFIRM: 'HIDE_CONFIRM'
}

const getDefaultState = () => ({
  base: 'BTC',
  quote: 'USD',
  orderAmount: 0.02,
  getAmount: null,
  spendAmount: null,
  price: null,
  type: 'buy',
  activeIndication: 'MARKET',
  activePercent: 0,
  percentItems: [10, 25, 50, 75],
  inProgress: false,
  showConfirm: false
})

const getters = {
  getBase: state => removePrefix(state.base),
  getQuote: state => removePrefix(state.quote),
  getMarketPrices: (state, getters, rootState, rootGetters) => rootGetters['orderBook/getTopOrders'],
  getOrderAmount: state => state.orderAmount,
  getType: state => state.type,
  getPercentItems: state => state.percentItems,
  getActivePercent: state => state.activePercent,
  getActiveIndication: state => state.activeIndication,
  getSpendAmount: state => state.spendAmount,
  getGetAmount: state => state.getAmount,
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
  [types.SET_GET_AMOUNT](state, value) {
    state.getAmount = value
  },
  [types.SET_SPEND_AMOUNT](state, value) {
    state.spendAmount = value
  },
  [types.SET_PRICE](state, value) {
    state.price = value
  },
  [types.RESET](state) {
    Object.assign(state, getDefaultState())
  },
  [types.RESET_AMOUNTS](state) {
    state.spendAmount = null
    state.getAmount = null
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
    commit(types.RESET_AMOUNTS)
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
  setGetAmount({ commit, state }, value) {
    commit(types.SET_GET_AMOUNT, value)
    // if (state.spendAmount && value) {
    //   commit(types.SET_PRICE, state.spendAmount / value)
    // }
    // if (!value) commit(types.SET_PRICE, null)
  },
  setSpendAmount({ commit, state }, value) {
    commit(types.SET_SPEND_AMOUNT, value)
    // if (state.getAmount && value) {
    //   commit(types.SET_PRICE, value / state.getAmount)
    // }
    // if (!value) commit(types.SET_PRICE, null)
  },
  setPrice({ commit, state }, value) {
    commit(types.SET_PRICE, value)
    // check if buy/sell
    // if (state.spendAmount && value) {
    //   commit(types.SET_GET_AMOUNT, value * state.spendAmount)
    // }
  },
  setOrderData({ commit, state }, { type, price, sum }) {
    console.log(type, price, sum)
    if (state.type === type) commit(types.SET_TYPE, type === 'buy' ? 'sell' : 'buy')
    commit(types.SET_PRICE, price)
    if (state.type === 'buy') {
      if (!state.getAmount) commit(types.SET_GET_AMOUNT, sum)
    } else {
      if (!state.spendAmount) commit(types.SET_SPEND_AMOUNT, sum)
    }
  },
  async dispatchOrder({ commit, state, rootGetters }) {
    const baseAsset = rootGetters['assets/getAssetBySymbol'](state.base)
    const quoteAsset = rootGetters['assets/getAssetBySymbol'](state.quote)
    const spendPrecision = (state.type === 'buy' ? quoteAsset : baseAsset).precision
    const getPrecision = (state.type === 'sell' ? baseAsset : quoteAsset).precision
    const spend = state.spendAmount * 10 ** spendPrecision
    const get = state.getAmount * 10 ** getPrecision
    console.log(state.getAmount, state.spendAmount)
    console.log(get, spend)

    const market = API.Market(baseAsset)
    if (market) {
      const sides = market.getOrderSides({
        type: state.type === 'sell' ? 'get' : 'spend',
        asset: quoteAsset,
        spend,
        get
      })
      const userId = rootGetters['acc/getAccountUserId']
      const newOrder = API.Transactions.createOrder(sides, userId)
      const keys = rootGetters['acc/getKeys']
      if (!keys) {
        console.warn('wallet is locked')
        return
      }
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
