const state = {
  currentBase: 'BTC'
}

const getters = {
  getCurrentBase(state) {
    return state.currentBase
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
