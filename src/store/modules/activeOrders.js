const types = {
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR',
  UPDATE_ACTIVE_LIST: 'UPDATE_ACTIVE_LIST'
}

const state = {
  searchStr: '',
  isFetching: false,
  activeList: []
}

const getters = {
  getSearchStr(state) {
    return state.searchStr
  },
  isFetching(state) {
    return state.isFetching
  },
  getActiveList: (state, getters, rootState, rootGetters) => {
    return rootGetters['operations/getActiveOrders']
  }
}

const mutations = {
  [types.UPDATE_SEARCH_STR](state, value) {
    state.searchStr = value
  },
  [types.UPDATE_ACTIVE_LIST](state, list) {
    state.activeList = list
  }
}

const actions = {
  changeSearchStr({ commit }, value) {
    commit(types.UPDATE_SEARCH_STR, value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
