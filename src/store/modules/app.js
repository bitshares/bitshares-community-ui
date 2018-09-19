const APP_INIT = 'APP_INIT'

const initialState = {
  theme: 'dark'
}

const getters = {
}

const mutations = {
  [APP_INIT] () {
  }
}

const actions = {
  init (store) {
    const { commit } = store
    store.dispatch('connection/initConnection', null, { root: true })
    commit(APP_INIT)
  }
}

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters
}
