const initialState = {
  theme: 'dark'
}

const getters = {
}

const mutations = {
}

const actions = {
  init (store) {
    store.dispatch('connection/initConnection', null, { root: true })
  }
}

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters
}
