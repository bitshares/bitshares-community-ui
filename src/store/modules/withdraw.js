const types = {
  TOGGLE_WITHDRAW_MODAL: 'TOGGLE_WITHDRAW_MODAL',
  SET_WITHDRAW_ASSET: 'SET_WITHDRAW_ASSET',
  SET_WITHDRAW_STEP: 'SET_WITHDRAW_STEP'
}

const getInitialState = () => ({
  showModal: false,
  withdrawAsset: null,
  withdrawStep: 'withdraw'
})

const getters = {
  modalDisplayed: state => state.showModal,
  getWithdrawAsset: state => state.withdrawAsset,
  getWithdrawStep: state => state.withdrawStep
}

const mutations = {
  [types.TOGGLE_WITHDRAW_MODAL](state, value) {
    state.showModal = !state.showModal
  },
  [types.SET_WITHDRAW_ASSET](state, { asset }) {
    state.withdrawAsset = asset
  },
  [types.SET_WITHDRAW_STEP](state, step) {
    state.withdrawStep = step
  }
}

const actions = {
  toggleModal({ commit }) {
    commit(types.TOGGLE_WITHDRAW_MODAL)
  },
  setWithdrawAsset({ commit }, { asset }) {
    commit(types.SET_WITHDRAW_ASSET, { asset })
  },
  setWithdrawStep({ commit, state }, step) {
    commit(types.SET_WITHDRAW_STEP, step)
    console.log(state.withdrawStep)
  }
}

export default {
  namespaced: true,
  state: getInitialState(),
  mutations,
  actions,
  getters
}
