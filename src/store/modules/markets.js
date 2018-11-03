const types = {
  UPDATE_FAVOURITES: 'UPDATE_FAVOURITES',
  UPDATE_CURRENT_TICKER: 'UPDATE_CURRENT_TICKER'
}

const state = {
  currentBase: 'BTS',
  favourites: {
    USD: ['ZIL', 'ONT'],
    ETH: ['POE']
  }
}

const getters = {
  getCurrentList: (state, getters, rootState, rootGetters) => {
    const stats = rootGetters['market/getMarketStats']
    const base = getters.getCurrentBase
    if (!stats || !stats[base]) return []
    const baseStats = stats[base]
    return Object.keys(baseStats).filter(ticker => !!baseStats[ticker]).map(ticker => baseStats[ticker])
  },
  isTickerFavourite: (state) => (base, quote) => {
    return state.favourites[base] && state.favourites[base].includes(quote)
  },
  // getFavouritesList(state, getters, rootState, rootGetters) {
  //   const favourites = []

  //   Object.keys(state.favourites).forEach(base => {
  //     const stats = rootGetters['market/getMarketStats']
  //     const quotes = Object.keys(stats[base])
  //     quotes.length && quotes.forEach(quote => {
  //       const favouriteItem = state[base].filter(item => quote === item.ticker)[0]
  //       favourites.push(favouriteItem)
  //     })
  //   })
  //   return favourites
  // },
  getCurrentBase(state) {
    return state.currentBase
  }
}

const mutations = {
  [types.UPDATE_FAVOURITES](state, { favourites }) {
    state.favourites = favourites
  },
  [types.UPDATE_CURRENT_TICKER](state, base) {
    state.currentBase = base
  }
}

const actions = {
  toggleFavourite({ state, commit, getters }, { base, quote }) {
    const newFavourites = Object.assign({}, state.favourites)

    if (getters.isTickerFavourite(base, quote)) {
      newFavourites[base] = newFavourites[base].filter(elem => elem !== quote)
    } else {
      if (!newFavourites[base]) newFavourites[base] = []
      newFavourites[base].push(quote)
    }

    commit(types.UPDATE_FAVOURITES, {
      favourites: newFavourites
    })
  },
  setCurrentBase({ commit, dispatch }, base) {
    dispatch('market/fetchMarketStats', base, { root: true })
    commit(types.UPDATE_CURRENT_TICKER, base)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
