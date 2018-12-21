const types = {
  TOGGLE_WITHDRAW_MODAL: 'TOGGLE_WITHDRAW_MODAL',
  SET_WITHDRAW_ASSET: 'SET_WITHDRAW_ASSET',
  SET_WITHDRAW_AMOUNT: 'SET_WITHDRAW_AMOUNT',
  SET_WITHDRAW_ADDRESS: 'SET_WITHDRAW_ADDRESS',
  SET_WITHDRAW_STEP: 'SET_WITHDRAW_STEP',
  SET_WITHDRAW_TYPE: 'SET_WITHDRAW_TYPE',
  SET_WITHDRAW_MEMO: 'SET_WITHDRAW_MEMO'
}

const getInitialState = () => ({
  showModal: false,
  withdrawAsset: null,
  withdrawAmount: null,
  withdrawAddress: null,
  withdrawStep: 'withdraw',
  withdrawMemo: '',
  type: 'withdraw'
})

const getters = {
  modalDisplayed: state => state.showModal,
  getWithdrawAsset: state => state.withdrawAsset,
  getWithdrawAmount: state => state.withdrawAmount,
  getWithdrawAddress: state => state.withdrawAddress,
  getWithdrawStep: state => state.withdrawStep,
  getWithdrawType: state => state.type,
  getWithdrawMemo: state => state.withdrawMemo
}

const mutations = {
  [types.TOGGLE_WITHDRAW_MODAL](state) {
    state.showModal = !state.showModal
  },
  [types.SET_WITHDRAW_ASSET](state, { asset }) {
    state.withdrawAsset = asset
  },
  [types.SET_WITHDRAW_AMOUNT](state, { amount }) {
    state.withdrawAmount = amount
  },
  [types.SET_WITHDRAW_ADDRESS](state, { address }) {
    state.withdrawAddress = address
  },
  [types.SET_WITHDRAW_STEP](state, step) {
    state.withdrawStep = step
  },
  [types.SET_WITHDRAW_TYPE](state, type) {
    state.type = type
  },
  [types.SET_WITHDRAW_MEMO](state, memo) {
    state.withdrawMemo = memo
  }
}

const actions = {
  toggleModal({ commit }, type) {
    commit(types.TOGGLE_WITHDRAW_MODAL)
    commit(types.SET_WITHDRAW_STEP, 'withdraw')
    commit(types.SET_WITHDRAW_TYPE, type)
  },
  setWithdrawAsset({ commit }, { asset }) {
    commit(types.SET_WITHDRAW_ASSET, { asset })
  },
  setWithdrawAmount({ commit }, { amount }) {
    commit(types.SET_WITHDRAW_AMOUNT, { amount })
  },
  setWithdrawAddress({ commit }, { address }) {
    commit(types.SET_WITHDRAW_ADDRESS, { address })
  },
  setWithdrawStep({ commit, state }, step) {
    commit(types.SET_WITHDRAW_STEP, step)
  },
  setWithdrawMemo({ commit }, memo) {
    commit(types.SET_WITHDRAW_MEMO, memo)
  }
}

export default {
  namespaced: true,
  state: getInitialState(),
  mutations,
  actions,
  getters
}
