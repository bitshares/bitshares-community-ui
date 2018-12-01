const types = {
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR',
  UPDATE_ACTIVE_LIST: 'UPDATE_ACTIVE_LIST'
}

const state = {
  searchStr: '',
  isFetching: false,
  activeList: [
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'buy',
      payAssetSymbol: 'BTS',
      avg: 1.3531,
      price: 1.1231,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'sell',
      payAssetSymbol: 'BTS',
      avg: 1.318,
      price: 1.912,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'buy',
      payAssetSymbol: 'BTS',
      avg: 1.35000,
      price: 1.50000,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'buy',
      payAssetSymbol: 'BTS',
      avg: 1.319,
      price: 1.671,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'sell',
      payAssetSymbol: 'BTS',
      avg: 1.3500,
      price: 1.500,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'buy',
      payAssetSymbol: 'BTS',
      avg: 2.353184,
      price: 2.5120,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'buy',
      payAssetSymbol: 'BTS',
      avg: 1.35319,
      price: 1.53182,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    },
    {
      dateClose: 1541712454000,
      dateOpen: 1541712454000,
      get: 0.0006,
      order: 'sell',
      payAssetSymbol: 'BTS',
      avg: 1.35232,
      price: 1.531931,
      vol: 1313.232,
      receiveAssetSymbol: 'CNY',
      spend: '0.0009'
    }
  ]
}

const getters = {
  getSearchStr(state) {
    return state.searchStr
  },
  isFetching(state) {
    return state.isFetching
  },
  getActiveList: (state, getters, rootState, rootGetters) => {
    const orders = rootGetters['acc/getActiveOrders']
    console.log('active orders: ', orders)
    const parsedActiveOrders = orders.map(order => {
      // const dateOpen =
      const side = order.deferred_paid_fee.asset_id === order.sell_price.asset_id ? 'buy' : 'sell'
      console.log(side)
      const payAsset = side === 'buy'
        ? rootGetters['assets/getAssetById'](order.sell_price.base.asset_id)
        : rootGetters['assets/getAssetById'](order.sell_price.quote.asset_id)
      const receiveAsset = side === 'buy'
        ? rootGetters['assets/getAssetById'](order.sell_price.quote.asset_id)
        : rootGetters['assets/getAssetById'](order.sell_price.base.asset_id)
      const payAssetSymbol = payAsset.symbol
      const receiveAssetSymbol = receiveAsset.symbol
      console.log('pay asset symbol:', payAssetSymbol)
      console.log('receiveAssetSymbol:', receiveAssetSymbol)
      let filled = side === 'sell'
        ? order.sell_price.base.amount - order.for_sale
        : order.sell_price.quote.amount - order.for_sale
      filled = (filled * 100).toFixed()
      console.log(filled)
      const precisionDiff = side === 'buy'
        ? payAsset.precision - receiveAsset.precision
        : receiveAsset.precision - payAsset.precision
      const price = side === 'buy'
        ? ((order.sell_price.base.amount / order.sell_price.quote.amount) * (10 ** precisionDiff)).toFixed(8)
        : ((order.sell_price.quote.amount / order.sell_price.base.amount) * (10 ** precisionDiff)).toFixed(8)
      console.log(price)
      const spend = side === 'buy'
        ? order.sell_price.quote.amount / (10 ** receiveAsset.precision)
        : order.sell_price.base.amount / (10 ** receiveAsset.precision)
      const get = side === 'buy'
        ? order.sell_price.base.amount / (10 ** payAsset.precision)
        : order.sell_price.quote.amount / (10 ** payAsset.precision)
      console.log('spend', spend)
      console.log('get', get)
      return {
        get,
        spend,
        price,
        filled,
        payAssetSymbol,
        receiveAssetSymbol
      }
    })
    // return parsedActiveOrders
    // now its demo case for activeOrders test
    return state.activeList.map(listItem => Object.assign(
      {},
      listItem,
      { filled: Math.round(Math.random() * 100) }
    ))
  }
}

const mutations = {
  [types.UPDATE_SEARCH_STR](state, value) {
    state.searchStr = value
  },
  [types.UPDATE_ACTIVE_LIST](state, list) {
    state.activeList = list
  }
}

const actions = {
  changeSearchStr({ commit }, value) {
    commit(types.UPDATE_SEARCH_STR, value)
  },
  removeActiveOrder({ commit, state }, ndx) {
    commit(types.UPDATE_ACTIVE_LIST, state.activeList.filter((order, index) => ndx !== index))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
