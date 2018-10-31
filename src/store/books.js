const state = {
  lastPrice: '6 745',
  currentTicker: 'USD',
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
      { sum: 1939.99, price: 0.11477 }
    ],
    selling: [
      { sum: 0.10391, price: 129.61 },
      { sum: 0.11985, price: 131.23 },
      { sum: 0.12069, price: 145.01 },
      { sum: 0.12145, price: 368.22 },
      { sum: 0.13885, price: 565.74 },
      { sum: 0.13987, price: 1235.14 },
      { sum: 0.14333, price: 1632.05 },
      { sum: 0.14365, price: 1821.69 },
      { sum: 0.15370, price: 2597.05 },
      { sum: 0.15377, price: 3199.98 },
      { sum: 0.15412, price: 3487.02 }
    ]
  }
}

const getters = {
  getLastPrice(state) {
    return state.lastPrice
  },
  getCurrentTicker(state) {
    return state.currentTicker
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
