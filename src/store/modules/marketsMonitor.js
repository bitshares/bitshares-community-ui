import config from 'vuex-bitshares/config.js'
const types = {
  UPDATE_FAVOURITES: 'UPDATE_FAVOURITES',
  UPDATE_CURRENT_BASE: 'UPDATE_CURRENT_BASE',
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR'
}

const state = {
  currentBase: 'USD',
  favourites: {},
  searchStr: ''
}

const getters = {
  getSearchStr(state) {
    return state.searchStr
  },
  getCurrentList: (state, getters, rootState, rootGetters) => {
    const base = getters.getCurrentBase
    const stats = rootGetters['market/getMarketStats']
    if (!stats[base] || !stats[base].list) return []
    const baseStats = stats[base].list
    return Object.keys(baseStats).map(quote => baseStats[quote])
  },
  isListFetching: (state, getters, rootState, rootGetters) => {
    const base = getters.getCurrentBase
    const stats = rootGetters['market/getMarketStats']
    if (base === 'favourites') {
      const favFetching = Object.keys(state.favourites).map(base => stats[base].fetching).find(isFetching => !!isFetching)
      return !!favFetching
    }
    return (stats[base] && stats[base].fetching) || false
  },
  getFavouritesList: (state, getters, rootState, rootGetters) => {
    const stats = rootGetters['market/getMarketStats']
    const favourites = getters.getFavourites

    return Object.keys(favourites).reduce((result, base) => {
      const baseStats = stats[base] && stats[base].list
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
  getCurrentBase: state => state.currentBase,
  favouritesCount: state => {
    const favs = state.favourites
    return Object.keys(favs).reduce((result, base) => {
      return favs[base].length
    }, 0)
  }
}

const mutations = {
  [types.UPDATE_FAVOURITES](state, { favourites }) {
    state.favourites = favourites
  },
  [types.UPDATE_CURRENT_BASE](state, base) {
    state.currentBase = base
  },
  [types.UPDATE_SEARCH_STR](state, value) {
    state.searchStr = value
  }
}

const actions = {
  initialize({ dispatch }) {
    const { defaultMarkets } = config

    // fetch market stats
    Object.keys(defaultMarkets).forEach(base => {
      dispatch('market/fetchMarketStats', base, { root: true })
    })
  },
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
  },
  changeSearchStr({ commit }, value) {
    commit(types.UPDATE_SEARCH_STR, value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
