const types = {
  TOGGLE_CHANGEPASSWORD_MODAL: 'TOGGLE_CHANGEPASSWORD_MODAL',
  SET_PASSWORD_STEP: 'SET_PASSWORD_STEP'
}

const getInitialState = () => ({
  showModal: false,
  passwordStep: 'change'
})

const getters = {
  modalDisplayed: state => state.showModal,
  getPasswordStep: state => state.passwordStep
}

const mutations = {
  [types.TOGGLE_CHANGEPASSWORD_MODAL](state) {
    state.showModal = !state.showModal
  },
  [types.SET_PASSWORD_STEP](state, step) {
    state.passwordStep = step
  }
}

const actions = {
  toggleModal({ commit }) {
    commit(types.TOGGLE_CHANGEPASSWORD_MODAL)
  },
  setPasswordStep({ commit }, step) {
    commit(types.SET_PASSWORD_STEP, step)
  }
}

export default {
  namespaced: true,
  state: getInitialState(),
  mutations,
  actions,
  getters
}
