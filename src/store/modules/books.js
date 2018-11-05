const state = {
  lastPrice: '6 745',
  orderBook: {
    buying: [
      { sum: 98.23, price: 0.25069 },
      { sum: 129.00, price: 0.014261 },
      { sum: 650.23, price: 0.13246 },
      { sum: 1220.85, price: 0.13224 },
      { sum: 1318.99, price: 0.13124 },
      { sum: 1412.11, price: 0.13102 },
      { sum: 1439.08, price: 0.12987 },
      { sum: 1622.27, price: 0.12859 },
      { sum: 1719.73, price: 0.12765 },
      { sum: 1856.20, price: 0.12523 },
      { sum: 1939.99, price: 0.11477 },
      { sum: 1939.99, price: 0.11477 },
      { sum: 1939.99, price: 0.11477 },
      { sum: 1939.99, price: 0.11477 },
      { sum: 1939.99, price: 0.11477 }
    ],
    selling: [
      { sum: 129.61, price: 0.10391 },
      { sum: 131.23, price: 0.11985 },
      { sum: 145.01, price: 0.12069 },
      { sum: 368.22, price: 0.12145 },
      { sum: 565.74, price: 0.13885 },
      { sum: 1235.14, price: 0.13987 },
      { sum: 1632.05, price: 0.14333 },
      { sum: 1821.69, price: 0.14365 },
      { sum: 2597.05, price: 0.15370 },
      { sum: 3199.98, price: 0.15377 },
      { sum: 3487.02, price: 0.15412 },
      { sum: 3487.02, price: 0.15412 },
      { sum: 3487.02, price: 0.15412 },
      { sum: 3487.02, price: 0.15412 },
      { sum: 3487.02, price: 0.15412 }
    ]
  }
}

const getters = {
  getLastPrice(state) {
    return state.lastPrice
  },
  getMaxOrderAmount(state) {
    const maxFromBuy = state.orderBook.buying.slice(0).pop().sum
    const maxFromSell = state.orderBook.selling.slice(0).pop().sum

    return maxFromBuy > maxFromSell ? maxFromBuy : maxFromSell
  },
  getOrderBook(state) {
    return state.orderBook
  }
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
