const types = {
  UPDATE_BACKUP_FLAG: 'UPDATE_BACKUP_FLAG'
}

const state = {
  backupFlag: false
}

const getters = {
  getBackupFlag(state) {
    return state.backupFlag
  }
}

const mutations = {
  [types.UPDATE_BACKUP_FLAG](state, value) {
    state.backupFlag = value
  }
}

const actions = {
  setBackupFlag({ commit }, value) {
    commit(types.UPDATE_BACKUP_FLAG, value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
