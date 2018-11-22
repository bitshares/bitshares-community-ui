const state = {
  currentBase: 'BTC',
  tradeData: {
    buy: {
      base: 'Get BTC',
      value: 0.02,
      max: 0.04,
      point1: 10,
      point2: 50
    },
    sell: {
      base: 'Spend USD',
      value: 112.22,
      max: 437,
      point1: 25,
      point2: 75
    }
  }
}

const getters = {
  getCurrentBase(state) {
    return state.currentBase
  },
  getTradeData(state) {
    return state.tradeData
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
