const types = {
  TOGGLE_WITHDRAW_MODAL: 'TOGGLE_WITHDRAW_MODAL',
  SET_WITHDRAW_ASSET: 'SET_WITHDRAW_ASSET',
  SET_WITHDRAW_AMOUNT: 'SET_WITHDRAW_AMOUNT',
  SET_WITHDRAW_ADDRESS: 'SET_WITHDRAW_ADDRESS',
  SET_WITHDRAW_STEP: 'SET_WITHDRAW_STEP',
  SET_WITHDRAW_TYPE: 'SET_WITHDRAW_TYPE',
  SET_WITHDRAW_MEMO: 'SET_WITHDRAW_MEMO',
  OPENLEDGER_UNAVAILABLE: 'OPENLEDGER_UNAVAILABLE',
  SET_OPENLEDGER_DATA: 'SET_OPENLEDGER_DATA'
}

const getInitialState = () => ({
  showModal: false,
  withdrawAsset: null,
  withdrawAmount: null,
  withdrawAddress: null,
  withdrawStep: 'withdraw',
  withdrawMemo: '',
  type: 'withdraw',
  openledger: {
    works: true,
    fee: 0,
    account: 'openledger-dex',
    asset: ''
  }
})

const getters = {
  modalDisplayed: state => state.showModal,
  getWithdrawAsset: state => state.withdrawAsset,
  getWithdrawAmount: state => state.withdrawAmount,
  getWithdrawTransactionAmount: (state, getters, rootState, rootGetters) => {
    if (!getters.getWithdrawAsset) return 0
    const { assetId } = getters.getWithdrawAsset
    const amount = Math.floor(state.withdrawAmount * (10 ** rootGetters['assets/getAssetById'](assetId).precision))
    return amount
  },
  getWithdrawAddress: state => state.withdrawAddress,
  getWithdrawStep: state => state.withdrawStep,
  getWithdrawType: state => state.type,
  getWithdrawMemo: state => state.withdrawMemo,
  openledgerWorks: state => state.openledger.works,
  openledgerAccount: state => state.openledger.account,
  openledgerMemo: (state, getters) => {
    return `${state.openledger.asset}:${getters.getWithdrawAddress}`
  },
  openledgerFee: state => state.openledger.fee
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
  },
  [types.OPENLEDGER_UNAVAILABLE](state) {
    state.openledger.works = false
  },
  [types.SET_OPENLEDGER_DATA](state, { fee, account, asset }) {
    state.openledger.fee = fee
    state.openledger.account = account
    state.openledger.asset = asset
  }
}

const actions = {
  toggleModal({ commit }, type) {
    commit(types.TOGGLE_WITHDRAW_MODAL)
    commit(types.SET_WITHDRAW_STEP, 'withdraw')
    commit(types.SET_WITHDRAW_TYPE, type)
  },
  async setWithdrawAsset({ commit, state, dispatch }, { asset }) {
    commit(types.SET_WITHDRAW_ASSET, { asset })
    if (state.type === 'withdraw') {
      const openledgerData = await dispatch('openledger/fetchCoins', false, { root: true })
      if (!openledgerData) {
        commit(types.OPENLEDGER_UNAVAILABLE)
        return
      }
      const formatedAsset = asset.tiker.toLowerCase().replace('open.', '')
      const { gateFee, intermediateAccount } = openledgerData[formatedAsset]
      commit(types.SET_OPENLEDGER_DATA, {
        fee: gateFee,
        account: intermediateAccount,
        asset: formatedAsset
      })
    }
  },
  setWithdrawAmount({ commit }, { amount }) {
    console.log('Set withdraw amount', amount)
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
