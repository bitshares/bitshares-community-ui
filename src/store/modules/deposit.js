const types = {
  TOGGLE_DEPOSIT_MODAL: 'TOGGLE_DEPOSIT_MODAL',
  TOGGLE_ADDRESS_SCREEN: 'TOGGLE_ADDRESS_SCREEN',
  SET_DEPOSIT_ASSET: 'SET_DEPOSIT_ASSET'
}

const getInitialState = () => ({
  showModal: false,
  isAddressScreen: false,
  depositAsset: ''
})

const getters = {
  modalDisplayed: state => state.showModal,
  isAddressScreen: state => state.isAddressScreen,
  getDepositAsset: state => state.depositAsset
}

const mutations = {
  [types.TOGGLE_DEPOSIT_MODAL](state, value) {
    state.showModal = !state.showModal
  },
  [types.TOGGLE_ADDRESS_SCREEN](state, value) {
    state.isAddressScreen = value
  },
  [types.SET_DEPOSIT_ASSET](state, { asset }) {
    state.depositAsset = asset
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
  },
  setDepositAsset({ commit }, { asset }) {
    commit(types.SET_DEPOSIT_ASSET, { asset })
  }
}

export default {
  namespaced: true,
  state: getInitialState(),
  mutations,
  actions,
  getters
}
