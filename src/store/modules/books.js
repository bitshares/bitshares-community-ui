import { getMaxSum } from '@/helpers/utils'
import API from 'vuex-bitshares/src/services/api'
import orderBy from 'lodash/orderBy'
// import debounce from 'lodash/debounce'

const types = {
  SET_ORDER_BOOK: 'SET_ORDER_BOOK'
}

const state = {
  lastPrice: '6 745',
  baseAsset: '',
  quoteAsset: '',
  orderBook: {
    buying: [],
    selling: []
  }
}

const getters = {
  getLastPrice(state) {
    return state.lastPrice
  },
  getBaseSymbol: state => state.baseAsset,
  getQuoteSymbol: state => state.quoteAsset,
  getMaxOrderAmount(state) {
    const maxFromBuy = getMaxSum(state.orderBook.buying, 'sum')
    const maxFromSell = getMaxSum(state.orderBook.selling, 'sum')

    return maxFromBuy > maxFromSell ? maxFromBuy : maxFromSell
  },
  getOrderBook(state) {
    return state.orderBook
  }
}

const ordersConverted = (orders, type, baseAsset, quoteAsset) => {
  const processedOrders = orders.map(order => {
    const sum = order.for_sale / 10 ** baseAsset.precision
    const sellField = type === 'buy' ? 'base' : 'quote'
    const buyField = type === 'buy' ? 'quote' : 'base'
    const sellAmount = order.sell_price[sellField].amount / 10 ** baseAsset.precision
    const buyAmount = order.sell_price[buyField].amount / 10 ** quoteAsset.precision
    const price = sellAmount / buyAmount

    return {
      price,
      sum
    }
  })

  const sortType = type === 'buy' ? 'desc' : 'asc'
  return orderBy(processedOrders, 'price', sortType).slice(0, 20)
}

const mutations = {
  [types.SET_ORDER_BOOK](state, { orders, baseAsset, quoteAsset }) {
    state.baseAsset = baseAsset.symbol
    state.quoteAsset = quoteAsset.symbol
    state.orderBook.buying = ordersConverted(orders.buy, 'buy', baseAsset, quoteAsset)
    state.orderBook.selling = ordersConverted(orders.sell, 'sell', baseAsset, quoteAsset)
  }
}

const actions = {
  initialize(store, { baseSymbol, quoteSymbol }) {
    const { commit, rootGetters } = store
    const baseAsset = rootGetters['assets/getAssetBySymbol'](baseSymbol)
    const quoteAsset = rootGetters['assets/getAssetBySymbol'](quoteSymbol)
    const market = API.Market(baseAsset)
    if (market) {
      market.subscribeToMarket(quoteAsset.id, update => {
        console.log('Order book updated')
        console.log(API.Market(baseAsset).getBook(quoteAsset))
        const orders = API.Market(baseAsset).getBook(quoteAsset)

        commit(types.SET_ORDER_BOOK, { orders, baseAsset, quoteAsset })
      })
    } else {
      console.warn(`MARKET ERROR: No such market - ${baseSymbol}/${quoteSymbol}`)
    }
  },
  updateOrderBook(store, orders) {

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
