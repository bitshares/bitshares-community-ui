import { getMaxSum } from '@/helpers/utils'
import API from 'vuex-bitshares/src/services/api'
import orderBy from 'lodash/orderBy'
import debounce from 'lodash/debounce'

const types = {
  SET_ORDER_BOOK: 'SET_ORDER_BOOK',
  ORDER_BOOK_INIT_START: 'ORDER_BOOK_INIT_START',
  ORDER_BOOK_RESET: 'ORDER_BOOK_RESET',
  UPDATE_LAST_ORDER: 'UPDATE_LAST_ORDER'
}

const getDefaultState = () => ({
  lastPrice: null,
  baseAsset: null,
  quoteAsset: null,
  fetching: false,
  orderBook: {
    buying: [],
    selling: []
  },
  lastOrder: null
})

const getters = {
  getLastPrice: state => state.lastPrice,
  getBaseAsset: state => state.baseAsset,
  getQuoteAsset: state => state.quoteAsset,
  getMaxOrderAmount: state => {
    const maxFromBuy = getMaxSum(state.orderBook.buying, 'sum')
    const maxFromSell = getMaxSum(state.orderBook.selling, 'sum')

    return maxFromBuy > maxFromSell ? maxFromBuy : maxFromSell
  },
  getCumulativeBuyAmount: state => state.orderBook.buying.length && state.orderBook.buying.slice().pop().cumulativeAmount,
  getCumulativeSellAmount: state => state.orderBook.selling.length && state.orderBook.selling.slice().pop().cumulativeAmount,
  getOrderBook: state => state.orderBook,
  getLastOrder: state => state.lastOrder,
  getTopOrders: state => {
    return {
      buy: state.orderBook.buying[0] || { price: 0 },
      sell: state.orderBook.selling[0] || { price: 0 }
    }
  },
  isActive: state => !!(state.baseAsset && state.quoteAsset),
  isFetching: state => state.fetching
}

const processLastOrder = (order, baseAsset, quoteAsset) => {
  const type = order.pays.asset_id === baseAsset.id ? 'buy' : 'sell'
  const sellField = type === 'buy' ? 'pays' : 'receives'
  const buyField = type === 'buy' ? 'receives' : 'pays'
  const sellAmount = order[sellField].amount / 10 ** baseAsset.precision
  const buyAmount = order[buyField].amount / 10 ** quoteAsset.precision
  const price = sellAmount / buyAmount

  return { price, sum: sellAmount }
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
  const sortedOrders = orderBy(processedOrders, 'price', sortType).slice(0, 100)
  let cumulativeAmount = 0
  sortedOrders.map(order => {
    cumulativeAmount += order.sum
    order.cumulativeAmount = cumulativeAmount
  })
  return sortedOrders
}

const mutations = {
  [types.SET_ORDER_BOOK](state, { orders }) {
    state.fetching = false
    state.orderBook.buying = processOrders(orders.buy, 'buy', state.baseAsset, state.quoteAsset)
    state.orderBook.selling = processOrders(orders.sell, 'sell', state.baseAsset, state.quoteAsset)
  },
  [types.ORDER_BOOK_INIT_START](state, { baseAsset, quoteAsset }) {
    state.fetching = true
    state.baseAsset = baseAsset
    state.quoteAsset = quoteAsset
  },
  [types.UPDATE_LAST_ORDER](state, order) {
    state.lastOrder = processLastOrder(order, state.baseAsset, state.quoteAsset)
  },
  [types.ORDER_BOOK_RESET](state) {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  initialize(store, { baseSymbol, quoteSymbol }) {
    const { commit, rootGetters } = store
    actions.deinit(store)

    const baseAsset = rootGetters['assets/getAssetBySymbol'](baseSymbol)
    const quoteAsset = rootGetters['assets/getAssetBySymbol'](quoteSymbol)
    commit(types.ORDER_BOOK_INIT_START, { baseAsset, quoteAsset })
    const market = API.Market(baseAsset)
    if (market) {
      market.subscribeToMarket(quoteAsset.id, update => {
        const orders = API.Market(baseAsset).getBook(quoteAsset)
        debouncedUpdate(store, { orders })
      })
      market.subscribeToLastOrder(quoteAsset.id, (order) => {
        actions.updateLastOrder(store, order)
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
    commit(types.ORDER_BOOK_RESET)
  },
  updateOrderBook({ commit }, { orders }) {
    commit(types.SET_ORDER_BOOK, { orders })
  },
  async updateLastOrder({ commit }, order) {
    commit(types.UPDATE_LAST_ORDER, order)
  }
}

const debouncedUpdate = debounce(actions.updateOrderBook, 500)

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
  actions,
  getters
}
