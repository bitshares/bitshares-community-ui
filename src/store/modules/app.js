const initialState = {
  theme: 'dark'
}

const getters = {
}

const mutations = {
}

const actions = {
  init(store) {
    store.dispatch('connection/initConnection', null, { root: true })
  },
  initUserData: async({ state, rootGetters, dispatch }) => {
    const userId = rootGetters['acc/getAccountUserId']
    await Promise.all([
      dispatch('user/fetchUser', userId, { root: true }),
      dispatch('assets/fetchDefaultAssets', null, { root: true }),
      dispatch('transactions/fetchComissions', null, { root: true }),
      dispatch(
        'operations/fetchAndSubscribe',
        { userId, limit: 50 },
        { root: true }
      )
    ])
    const balances = { ...rootGetters['account/getCurrentUserBalances'] }
    const defaultAssetsIds = rootGetters['assets/getDefaultAssetsIds']
    defaultAssetsIds.forEach(id => {
      if (balances[id]) return
      balances[id] = { balance: 0 }
    })
    await dispatch(
      'assets/fetchAssets',
      {
        assets: Object.keys(balances)
      },
      { root: true }
    )
  },
  unsubFromUserData({ dispatch }) {
    dispatch('operations/unsubscribeFromUserOperations', null, { root: true })
  },
  resetUserData({ dispatch }) {
    dispatch('operations/unsubscribeFromUserOperations', null, { root: true })
    dispatch('operations/resetState', null, { root: true })
  }
}

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters
}
