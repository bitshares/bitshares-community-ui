const types = {
  TOGGLE_DEPOSIT_MODAL: 'TOGGLE_DEPOSIT_MODAL',
  TOGGLE_ADDRESS_SCREEN: 'TOGGLE_ADDRESS_SCREEN'
}

const getInitialState = () => ({
  showModal: false,
  isAddressScreen: false
})

const getters = {
  modalDisplayed: state => state.showModal,
  isAddressScreen: state => state.isAddressScreen
}

const mutations = {
  [types.TOGGLE_DEPOSIT_MODAL](state, value) {
    state.showModal = !state.showModal
  },
  [types.TOGGLE_ADDRESS_SCREEN](state, value) {
    state.isAddressScreen = value
  }
}

const actions = {
  toggleModal({ commit, state }) {
    commit(types.TOGGLE_DEPOSIT_MODAL)

    if (!state.showModal) {
      commit(types.TOGGLE_ADDRESS_SCREEN, false)
    }
  },
  toggleAddressScreen({ commit }, value) {
    commit(types.TOGGLE_ADDRESS_SCREEN, value)
  }
}

export default {
  namespaced: true,
  state: getInitialState(),
  mutations,
  actions,
  getters
}
