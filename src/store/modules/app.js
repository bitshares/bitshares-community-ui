import API from 'vuex-bitshares/src/services/api.js'
console.log(API)

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
    dispatch('market/fetchMarketStats', 'USD', { root: true })
    await Promise.all([
      dispatch('acc/fetchCurrentUser', userId, { root: true }),
      dispatch('assets/fetchDefaultAssets', null, { root: true }),
      // dispatch('transactions/fetchComissions', null, { root: true }),
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

    const balancesIds = Object.keys(balances)
    dispatch('history/fetchAll', {
      baseId: '1.3.0',
      assetsIds: balancesIds,
      daysArr: [1, 7]
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
