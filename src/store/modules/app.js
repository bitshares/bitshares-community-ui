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
      dispatch('acc/fetchCurrentUser', userId, { root: true }),
      dispatch('assets/fetchDefaultAssets', null, { root: true }),
      dispatch('transactions/fetchComissions', null, { root: true }),
      dispatch(
        'operations/fetchAndSubscribe',
        { userId, limit: 50 },
        { root: true }
      )
    ])
    const balances = { ...rootGetters['acc/getUserBalances'] }
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

    const combinedAssetsIds = Object.keys(balances)
    dispatch('history/fetch', {
      baseId: '1.3.0',
      assetsIds: combinedAssetsIds,
      days: 1
    }, { root: true })
    dispatch('history/fetch', {
      baseId: '1.3.0',
      assetsIds: combinedAssetsIds,
      days: 7
    }, { root: true })
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
