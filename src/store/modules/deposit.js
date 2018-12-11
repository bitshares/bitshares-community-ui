const types = {
  TOGGLE_DEPOSIT_MODAL: 'TOGGLE_DEPOSIT_MODAL'
}

const getInitialState = () => ({
  showModal: false
})

const getters = {
  modalDisplayed: state => state.showModal
}

const mutations = {
  [types.TOGGLE_DEPOSIT_MODAL](state, value) {
    state.showModal = !state.showModal
  }
}

const actions = {
  toggleModal({ commit }) {
    commit(types.TOGGLE_DEPOSIT_MODAL)
  }
}

export default {
  namespaced: true,
  state: getInitialState(),
  mutations,
  actions,
  getters
}
