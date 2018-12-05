const state = {
  price: 3874,
  get: 1932,
  spend: 0.5,
  tradingFee: 15.82,
  exchangeFee: 10.23
}

const getters = {
  getPrice(state) {
    return state.price
  },
  getGet(state) {
    return state.get
  },
  getSpend(state) {
    return state.spend
  },
  getTradingFee(state) {
    return state.tradingFee
  },
  getExchangeFee(state) {
    return state.exchangeFee
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
