const types = {
  TOGGLE_BACKUP_MODAL: 'TOGGLE_BACKUP_MODAL'
}

const state = {
  showBackupModal: true
}

const getters = {
  modalDisplayed(state) {
    return state.showBackupModal
  }
}

const mutations = {
  [types.TOGGLE_BACKUP_MODAL](state, value) {
    state.showBackupModal = value
  }
}

const actions = {
  toggleModal({ commit }, value) {
    commit(types.TOGGLE_BACKUP_MODAL, value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
