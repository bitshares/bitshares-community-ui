const types = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_ORDERS_MODE: 'SET_ORDERS_MODE'
}

const getInitialState = () => ({
  activeTab: 'Markets',
  ordersMode: 'New Order'
})

const getters = {
  getActiveTab: state => state.activeTab,
  getOrdersMode: state => state.ordersMode
}

const mutations = {
  [types.SET_ACTIVE_TAB](state, tabName) {
    state.activeTab = tabName
  },
  [types.SET_ORDERS_MODE](state, modeName) {
    state.ordersMode = modeName
  }
}

const actions = {
  setActiveTab({ commit }, tabName) {
    commit(types.SET_ACTIVE_TAB, tabName)
  },
  setOrdersMode({ commit }, modeName) {
    commit(types.SET_ORDERS_MODE, modeName)
  }
}

export default {
  namespaced: true,
  state: getInitialState(),
  mutations,
  actions,
  getters
}
