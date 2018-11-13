import { getMaxSum } from '@/helpers/utils'
import API from 'vuex-bitshares/src/services/api'
import orderBy from 'lodash/orderBy'
import debounce from 'lodash/debounce'

const types = {
  SET_ORDER_BOOK: 'SET_ORDER_BOOK',
  ORDER_BOOK_INIT_START: 'ORDER_BOOK_INIT_START'
}

const state = {
  lastPrice: '6 745',
  baseAsset: '',
  quoteAsset: '',
  fetching: false,
  orderBook: {
    buying: [],
    selling: []
  }
}

const getters = {
  getLastPrice: state => state.lastPrice,
  getBaseSymbol: state => state.baseAsset.symbol,
  getQuoteSymbol: state => state.quoteAsset.symbol,
  getBaseAsset: state => state.baseAsset,
  getQuoteAsset: state => state.quoteAsset,
  getMaxOrderAmount(state) {
    const maxFromBuy = getMaxSum(state.orderBook.buying, 'sum')
    const maxFromSell = getMaxSum(state.orderBook.selling, 'sum')

    return maxFromBuy > maxFromSell ? maxFromBuy : maxFromSell
  },
  getOrderBook: state => state.orderBook,
  isActive: state => !!(state.baseAsset && state.quoteAsset),
  isFetching: state => state.fetching
}

const processOrders = (orders, type, baseAsset, quoteAsset) => {
  const processedOrders = orders.map(order => {
    let sum = order.for_sale / 10 ** baseAsset.precision
    const sellField = type === 'buy' ? 'base' : 'quote'
    const buyField = type === 'buy' ? 'quote' : 'base'
    const sellAmount = order.sell_price[sellField].amount / 10 ** baseAsset.precision
    const buyAmount = order.sell_price[buyField].amount / 10 ** quoteAsset.precision
    const price = sellAmount / buyAmount

    if (type === 'sell') sum = (order.for_sale / 10 ** quoteAsset.precision) * price
    return {
      price,
      sum
    }
  })

  const sortType = type === 'buy' ? 'desc' : 'asc'
  return orderBy(processedOrders, 'price', sortType).slice(0, 100)
}

const mutations = {
  [types.SET_ORDER_BOOK](state, { orders, baseAsset, quoteAsset }) {
    state.fetching = false
    state.baseAsset = baseAsset
    state.quoteAsset = quoteAsset
    state.orderBook.buying = processOrders(orders.buy, 'buy', baseAsset, quoteAsset)
    state.orderBook.selling = processOrders(orders.sell, 'sell', baseAsset, quoteAsset)
  },
  [types.ORDER_BOOK_INIT_START](state) {
    state.fetching = true
  }
}

const actions = {
  initialize(store, { baseSymbol, quoteSymbol }) {
    const { commit, rootGetters } = store
    commit(types.ORDER_BOOK_INIT_START)
    actions.deinit(store)

    const baseAsset = rootGetters['assets/getAssetBySymbol'](baseSymbol)
    const quoteAsset = rootGetters['assets/getAssetBySymbol'](quoteSymbol)
    const market = API.Market(baseAsset)
    if (market) {
      market.subscribeToMarket(quoteAsset.id, update => {
        const orders = API.Market(baseAsset).getBook(quoteAsset)
        debouncedUpdate(store, { orders, baseAsset, quoteAsset })
      })
    } else {
      console.warn(`MARKET ERROR: No such market - ${baseSymbol}/${quoteSymbol}`)
    }
  },
  deinit({ commit, getters }) {
    const baseAsset = getters.getBaseAsset
    const quoteAsset = getters.getQuoteAsset
    if (baseAsset && quoteAsset) {
      const market = API.Market(baseAsset)
      market.unsubscribeFromMarket(quoteAsset.id)
    }
  },
  updateOrderBook({ commit }, { orders, baseAsset, quoteAsset }) {
    console.log('debounced update')
    commit(types.SET_ORDER_BOOK, { orders, baseAsset, quoteAsset })
  }
}

const debouncedUpdate = debounce(actions.updateOrderBook, 800)

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
