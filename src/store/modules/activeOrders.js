const types = {
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR',
  UPDATE_ACTIVE_LIST: 'UPDATE_ACTIVE_LIST'
}

const state = {
  searchStr: '',
  isFetching: false,
  activeList: []
}

const parseOpenOrders = (orders, rootGetters) => {
  const parsedActiveOrders = orders.map(order => {
    // need to get if from somewhere
    const isBid = true

    const payInSellPrice = isBid ? order.sell_price.base : order.sell_price.quote
    const payAssetId = payInSellPrice.asset_id
    const payAsset = rootGetters['assets/getAssetById'](payAssetId)

    const receiveInSellPrice = isBid ? order.sell_price.quote : order.sell_price.base
    const receiveAssetId = receiveInSellPrice.asset_id
    const receiveAsset = rootGetters['assets/getAssetById'](receiveAssetId)

    const get = isBid
      ? parseFloat(receiveInSellPrice.amount) / (10 ** receiveAsset.precision)
      : parseFloat(payInSellPrice.amount) / (10 ** payAsset.precision)
    const spend = isBid
      ? parseFloat(payInSellPrice.amount) / (10 ** payAsset.precision)
      : parseFloat(receiveInSellPrice.amount) / (10 ** receiveAsset.precision)

    const payAssetSymbol = isBid ? payAsset.symbol : receiveAsset.symbol
    const receiveAssetSymbol = isBid ? receiveAsset.symbol : payAsset.symbol
    const filled = (order.sell_price.base.amount - order.for_sale) / (order.sell_price.base.amount)

    const price = isBid
      ? parseFloat(spend / get)
      : parseFloat(get / spend)

    const expiration = (new Date(order.expiration)).getTime()

    return {
      payAssetSymbol,
      receiveAssetSymbol,
      expiration,
      get,
      order: isBid ? 'buy' : 'sell',
      vol: isBid ? get : spend,
      spend,
      price,
      filled,
      orderId: order.id
    }
  })
  return parsedActiveOrders
}

const getters = {
  getSearchStr(state) {
    return state.searchStr
  },
  isFetching(state) {
    return state.isFetching
  },
  getActiveList: (state, getters, rootState, rootGetters) => {
    const dirtyActiveOrders = rootGetters['acc/getActiveOrders']
    return parseOpenOrders(dirtyActiveOrders, rootGetters)
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
