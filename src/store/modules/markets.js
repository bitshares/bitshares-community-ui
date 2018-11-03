const types = {
  UPDATE_FAVOURITES: 'UPDATE_FAVOURITES',
  UPDATE_CURRENT_BASE: 'UPDATE_CURRENT_BASE'
}

const state = {
  currentBase: 'USD',
  favourites: {}
}

const getters = {
  getCurrentList: (state, getters, rootState, rootGetters) => {
    const base = getters.getCurrentBase
    const stats = rootGetters['market/getMarketStats']
    if (!stats || !stats[base]) return []
    const baseStats = stats[base]
    return Object.keys(baseStats)
      .filter(quote => !!baseStats[quote])
      .map(quote => baseStats[quote])
  },
  getFavouritesList: (state, getters, rootState, rootGetters) => {
    const stats = rootGetters['market/getMarketStats']
    const favourites = getters.getFavourites

    return Object.keys(favourites).reduce((result, base) => {
      const baseStats = stats[base]
      if (!baseStats) return result
      const favouriteItems = Object.keys(baseStats)
        .filter(quote => favourites[base].includes(quote))
        .map(quote => baseStats[quote])
      return result.concat(favouriteItems)
    }, [])
  },
  isTickerFavourite: state => (base, quote) => {
    return state.favourites[base] && state.favourites[base].includes(quote)
  },
  getFavourites: state => state.favourites,
  getCurrentBase: state => {
    return state.currentBase
  }
}

const mutations = {
  [types.UPDATE_FAVOURITES](state, { favourites }) {
    state.favourites = favourites
  },
  [types.UPDATE_CURRENT_BASE](state, base) {
    state.currentBase = base
  }
}

const actions = {
  toggleFavourite({ state, commit, getters }, { base, quote }) {
    const newFavourites = Object.assign({}, state.favourites)

    if (getters.isTickerFavourite(base, quote)) {
      newFavourites[base] = newFavourites[base].filter(elem => elem !== quote)
      if (!newFavourites[base].length) delete newFavourites[base]
    } else {
      if (!newFavourites[base]) newFavourites[base] = []
      newFavourites[base].push(quote)
    }

    commit(types.UPDATE_FAVOURITES, { favourites: newFavourites })
  },
  setCurrentBase({ commit, dispatch, getters }, base) {
    // fetching markets stats
    if (base === 'favourites') {
      const favourites = getters.getFavourites
      Object.keys(favourites).forEach(base => {
        dispatch('market/fetchMarketStats', base, { root: true })
      })
    } else {
      dispatch('market/fetchMarketStats', base, { root: true })
    }

    commit(types.UPDATE_CURRENT_BASE, base)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
