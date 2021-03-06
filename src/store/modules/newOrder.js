import { removePrefix } from '@/helpers/utils'
import API from 'vuex-bitshares/src/services/api'
import Vue from 'vue'
import floor from 'lodash/floor'

const types = {
  SET_TYPE: 'SET_TYPE',
  SET_ACTIVE_PERCENT: 'SET_ACTIVE_PERCENT',
  SET_ACTIVE_INDICATION: 'SET_ACTIVE_INDICATION',
  SET_MARKET: 'SET_MARKET',
  SET_BASE_AMOUNT: 'SET_BASE_AMOUNT',
  SET_QUOTE_AMOUNT: 'SET_QUOTE_AMOUNT',
  SET_PRICE: 'SET_PRICE',
  SET_FEES: 'SET_FEES',
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
  price: '',
  fees: {
    transaction: {
      value: 0,
      usdEq: 0,
      asset: 'BTS'
    },
    market: {
      value: 0,
      usdEq: 0,
      asset: 'BTS'
    }
  },
  type: 'buy',
  possibleIndications: ['MARKET', 'LIMIT'],
  activeIndication: 'LIMIT',
  activePercent: 0,
  percentItems: [10, 25, 50, 75],
  inProgress: false,
  baseAmount: null,
  quoteAmount: null,
  showConfirm: false
})

const getters = {
  getBase: state => removePrefix(state.base),
  getQuote: state => removePrefix(state.quote),
  baseAsset: (state, getters, rootState, rootGetters) => {
    return rootGetters['assets/getAssetBySymbol'](state.base)
  },
  quoteAsset: (state, getters, rootState, rootGetters) => {
    return rootGetters['assets/getAssetBySymbol'](state.quote)
  },
  getMarketPrices: (state, getters, rootState, rootGetters) => rootGetters['orderBook/getTopOrders'],
  getFees: (state) => state.fees,
  getType: state => state.type,
  isBuyOrder: state => state.type === 'buy',
  getBaseAmount: state => state.baseAmount,
  getQuoteAmount: state => state.quoteAmount,
  getPercentItems: state => state.percentItems,
  getActivePercent: state => state.activePercent,
  getActiveIndication: state => state.activeIndication,
  getPossibleIndications: state => state.possibleIndications,
  getPrice: state => state.price.toString(),
  getFiatPrice: (state, getters, rootState, rootGetters) => {

    // calc usd price based on asset
  },
  hasFeeBalance: (state, getters, rootState, rootGetters) => {
    const { value: fee, asset } = getters.getFees.transaction
    const feeAssetBalance = rootGetters['portfolio/getTokensByAsset'](asset)
    return (feeAssetBalance >= fee)
  },
  getMaxBase: (state, getters, rootState, rootGetters) => {
    const rawAmount = rootGetters['portfolio/getTokensByAsset'](state.base)
    const precisedAmount = floor(rawAmount, getters.baseAsset.precision)
    if (!getters.isBuyOrder) {
      const { value, asset } = getters.getFees.transaction
      if (state.base === asset) {
        const reduced = floor(rawAmount - value, getters.baseAsset.precision)
        return (reduced > 0) ? reduced : 0
      }
    }
    return precisedAmount
  },
  getMaxQuote: (state, getters, rootState, rootGetters) => {
    const rawAmount = rootGetters['portfolio/getTokensByAsset'](state.quote)
    const precisedAmount = floor(rawAmount, getters.quoteAsset.precision)
    if (getters.isBuyOrder) {
      const { value, asset } = getters.getFees.transaction
      if (state.quote === asset) {
        const reduced = floor(rawAmount - value, getters.baseAsset.precision)
        return (reduced > 0) ? reduced : 0
      }
    }
    return precisedAmount
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
  [types.SET_FEES](state, { transaction, market }) {
    Vue.set(state.fees, 'transaction', transaction)
    Vue.set(state.fees, 'market', market)
  },
  [types.SET_BASE_AMOUNT](state, value) {
    Vue.set(state, 'baseAmount', value)
  },
  [types.SET_QUOTE_AMOUNT](state, value) {
    Vue.set(state, 'quoteAmount', value)
  },
  [types.SET_PRICE](state, value) {
    state.price = value // parseFloat((+value + '').substring(0, 9))
  },
  [types.RESET](state) {
    Object.assign(state, getDefaultState())
  },
  [types.RESET_AMOUNTS](state) {
    state.baseAmount = null
    state.quoteAmount = null
    state.price = 0
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
  setType({ commit, state }, tab) {
    if (state.activeIndication === 'MARKET') {
      commit(types.RESET_AMOUNTS)
    }
    commit(types.SET_TYPE, tab)
    commit(types.SET_PRICE, '')
  },
  setMarket({ commit, dispatch }, { base, quote }) {
    commit(types.RESET)
    commit(types.SET_MARKET, { base, quote })
    dispatch('fetchFees')
  },
  setActivePercent({ commit }, percent) {
    commit(types.SET_ACTIVE_PERCENT, percent)
  },
  setActiveIndication({ commit }, indication) {
    if (indication === 'MARKET') {
      commit(types.RESET_AMOUNTS)
    }
    commit(types.SET_ACTIVE_INDICATION, indication)
    commit(types.SET_PRICE, '')
  },
  showConfirm({ commit }) {
    commit(types.SHOW_CONFIRM)
  },
  hideConfirm({ commit }) {
    commit(types.HIDE_CONFIRM)
  },
  setBaseAmount({ state, commit, getters }, value) {
    if (state.activeIndication === 'MARKET' && state.type === 'sell') return

    const quotePrecision = getters.quoteAsset.precision
    const basePrecision = getters.baseAsset.precision
    commit(types.SET_BASE_AMOUNT, floor(value, basePrecision))
    if (state.price && value) {
      commit(types.SET_QUOTE_AMOUNT, floor(value / state.price, quotePrecision))
    }
    if (state.quoteAmount && value && !state.price) {
      commit(types.SET_PRICE, value / state.quoteAmount)
    }
  },
  setQuoteAmount({ state, commit, getters }, value) {
    if (state.activeIndication === 'MARKET' && state.type === 'buy') return

    const quotePrecision = getters.quoteAsset.precision
    const basePrecision = getters.baseAsset.precision
    const precisedAmount = floor(value, quotePrecision)
    commit(types.SET_QUOTE_AMOUNT, precisedAmount)
    if (state.price && value) {
      commit(types.SET_BASE_AMOUNT, floor(value * state.price, basePrecision))
    }
    if (state.baseAmount && value && !state.price) {
      commit(types.SET_PRICE, state.baseAmount / value)
    }
  },
  setPrice({ commit, state, getters }, value) {
    if (state.activeIndication === 'MARKET') return

    const basePrecision = getters.baseAsset.precision
    const quotePrecision = getters.quoteAsset.precision
    const price = value
    commit(types.SET_PRICE, price)

    if (state.type === 'sell' && state.quoteAmount) {
      const baseAmount = floor(state.quoteAmount * price, basePrecision)
      commit(types.SET_BASE_AMOUNT, baseAmount)
    } else if (state.type === 'buy' && state.baseAmount) {
      const quoteAmount = floor(state.baseAmount / price, quotePrecision)
      commit(types.SET_QUOTE_AMOUNT, quoteAmount)
    }
  },
  setOrderData({ dispatch, state }, { type, price, sum }) {
    dispatch('setPrice', price)
    if (!state.baseAmount) dispatch('setBaseAmount', sum)
  },
  async fetchFees({ commit, state, rootGetters }) {
    const { fee: transactionFeeRaw } = await API.Parameters.getComissionByType('limit_order_create')
    // TODO: Worker 2 - in some market we can pay this fee with different asset (core exchange rate or fee pool)
    const transactionFeeAsset = rootGetters['assets/getAssetBySymbol']('BTS')
    const transactionFee = transactionFeeRaw / (10 ** transactionFeeAsset.precision)

    const quoteAsset = rootGetters['assets/getAssetBySymbol'](state.quote)
    // TODO: Preload comissions in assets module
    const [{ options: { market_fee_percent: quoteFeePercent } }] = await API.Assets.fetch([quoteAsset.id])
    const quoteFeeAmount = (state.quoteAmount * quoteFeePercent / 100)

    commit(types.SET_FEES, {
      transaction: {
        value: transactionFee,
        asset: transactionFeeAsset.symbol
      },
      market: {
        value: (quoteFeeAmount > 0) ? quoteFeeAmount.toFixed(quoteAsset.precision) : 0,
        asset: quoteAsset.symbol
      }
    })
  },
  async dispatchOrder({ commit, state, rootGetters, getters }) {
    const baseAsset = getters.baseAsset
    const quoteAsset = getters.quoteAsset
    const baseAmount = floor(state.baseAmount * 10 ** baseAsset.precision)
    const quoteAmount = floor(state.quoteAmount * 10 ** quoteAsset.precision)
    const get = state.type === 'buy' ? quoteAmount : baseAmount
    const spend = state.type === 'buy' ? baseAmount : quoteAmount

    const market = API.Market(baseAsset)
    if (market) {
      const sides = market.getOrderSides({
        type: state.type === 'sell' ? 'spend' : 'get',
        asset: quoteAsset,
        spend,
        get
      })
      const userId = rootGetters['acc/getAccountUserId']
      const newOrder = API.Transactions.createOrder(sides, userId)
      console.log('Order:', newOrder)
      const keys = rootGetters['acc/getKeys']
      commit(types.PLACE_ORDER_REQUEST)
      const result = await API.Transactions.placeOrder(newOrder, keys)
      commit(types.PLACE_ORDER_COMPLETE)
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
