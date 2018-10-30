const types = {
  UPDATE_FAVOURITES: 'UPDATE_FAVOURITES',
  UPDATE_CURRENT_TICKER: 'UPDATE_CURRENT_TICKER'
}

const state = {
  currentTicker: 'USD',
  favourites: {
    1: true,
    2: true,
    7: true,
    8: true
  },
  marketsField: {
    small: [
      {
        title: 'Name/Vol, {currentTicker}',
        sortField: 'ticker',
        classes: ['tickers-list__field']
      },
      {
        title: 'Price, {currentTicker}',
        sortField: 'priceUsd1',
        classes: ['tickers-list__field _flex05']
      },
      {
        title: '24h%/7d%',
        sortField: 'change1',
        classes: ['tickers-list__field _alignRight']
      }
    ],
    large: [
      {
        title: 'Name',
        sortField: 'ticker',
        classes: ['tickers-list__field pl-31']
      },
      {
        title: 'Volume, {currentTicker}',
        sortField: 'volUsd',
        classes: ['tickers-list__field']
      },
      {
        title: 'Price',
        sortField: 'priceUsd1',
        classes: ['tickers-list__field _flex05']
      },
      {
        title: '24h%',
        sortField: 'change1',
        classes: ['tickers-list__field _flex05 _alignRight']
      },
      {
        title: '7d%',
        sortField: 'change2',
        classes: ['tickers-list__field _flex05 _alignRight']
      },
      {
        title: 'Market Cap, {currentTicker}',
        sortField: 'marketcap',
        classes: ['tickers-list__field _alignRight']
      }
    ]
  },
  markets: {
    USD: [
      {
        id: 1,
        ticker: 'ZIL',
        curr: 'USD',
        volUsd: 10764160,
        priceUsd1: 0.034810,
        priceUsd2: 0.04,
        change1: 37.77,
        change2: 12,
        marketcap: 270832369
      },
      {
        id: 2,
        ticker: 'ONT',
        curr: 'USD',
        volUsd: 46950092,
        priceUsd1: 1.93,
        priceUsd2: 0.03,
        change1: 18.53,
        change2: 14,
        marketcap: 2708323
      },
      {
        id: 3,
        ticker: 'ZCN',
        curr: 'USD',
        volUsd: 934230,
        priceUsd1: 9.29,
        priceUsd2: 0.01,
        change1: -0.12,
        change2: -17,
        marketcap: 130532
      },
      {
        id: 4,
        ticker: 'CFI',
        curr: 'USD',
        volUsd: 36235,
        priceUsd1: 0.023335,
        priceUsd2: 0.02,
        change1: -1.77,
        change2: -11,
        marketcap: 58371323
      },
      {
        id: 5,
        ticker: 'AIO',
        curr: 'USD',
        volUsd: 1888236,
        priceUsd1: 0.445555,
        priceUsd2: 0.03,
        change1: -0.14,
        change2: -10,
        marketcap: 923832362
      },
      {
        id: 6,
        ticker: 'POE',
        curr: 'USD',
        volUsd: 325688,
        priceUsd1: 0.0058,
        priceUsd2: 0.04,
        change1: -0.29,
        change2: -14,
        marketcap: 123738
      },
      {
        id: 33,
        ticker: 'DASH',
        curr: 'USD',
        volUsd: 36235,
        priceUsd1: 0.023335,
        priceUsd2: 0.02,
        change1: -1.77,
        change2: -11,
        marketcap: 58371323
      },
      {
        id: 44,
        ticker: 'ETC',
        curr: 'USD',
        volUsd: 1888236,
        priceUsd1: 0.445555,
        priceUsd2: 0.03,
        change1: -0.14,
        change2: -10,
        marketcap: 923832362
      },
      {
        id: 55,
        ticker: 'BTG',
        curr: 'USD',
        volUsd: 325688,
        priceUsd1: 0.0058,
        priceUsd2: 0.04,
        change1: -0.29,
        change2: -14,
        marketcap: 123738
      },
      {
        id: 66,
        ticker: 'BCH',
        curr: 'USD',
        volUsd: 325688,
        priceUsd1: 0.0058,
        priceUsd2: 0.04,
        change1: -0.29,
        change2: -14,
        marketcap: 123738
      },
      {
        id: 67,
        ticker: 'RPL',
        curr: 'USD',
        volUsd: 325688,
        priceUsd1: 0.0058,
        priceUsd2: 0.04,
        change1: -0.29,
        change2: -14,
        marketcap: 123738
      },
      {
        id: 68,
        ticker: 'OMNI',
        curr: 'USD',
        volUsd: 325688,
        priceUsd1: 0.0058,
        priceUsd2: 0.04,
        change1: -0.29,
        change2: -14,
        marketcap: 123738
      }
    ],
    BTC: [
      {
        id: 7,
        ticker: 'ZCN',
        curr: 'BTC',
        volUsd: 934230,
        priceUsd1: 9.29,
        priceUsd2: 0.01,
        change1: -0.12,
        change2: -17,
        marketcap: 2373838
      },
      {
        id: 8,
        ticker: 'CFI',
        curr: 'BTC',
        volUsd: 36235,
        priceUsd1: 0.023335,
        priceUsd2: 0.02,
        change1: -1.77,
        change2: -11,
        marketcap: 29392392
      },
      {
        id: 9,
        ticker: 'AIO',
        curr: 'BTC',
        volUsd: 1888236,
        priceUsd1: 0.445555,
        priceUsd2: 0.03,
        change1: -0.14,
        change2: -10,
        marketcap: 2828471
      },
      {
        id: 10,
        ticker: 'POE',
        curr: 'BTC',
        volUsd: 325688,
        priceUsd1: 0.0058,
        priceUsd2: 0.04,
        change1: -0.29,
        change2: -14,
        marketcap: 883171
      }
    ],
    ETH: [
      {
        id: 11,
        ticker: 'AIO',
        curr: 'ETH',
        volUsd: 1888236,
        priceUsd1: 0.445555,
        priceUsd2: 0.03,
        change1: -0.14,
        change2: -10,
        marketcap: 270832369
      },
      {
        id: 12,
        ticker: 'POE',
        curr: 'ETH',
        volUsd: 325688,
        priceUsd1: 0.0058,
        priceUsd2: 0.04,
        change1: -0.29,
        change2: -14,
        marketcap: 82832818
      }
    ],
    CNY: [
      {
        id: 13,
        ticker: 'ZIL',
        curr: 'CNY',
        volUsd: 10764160,
        priceUsd1: 0.034810,
        priceUsd2: 0.04,
        change1: 37.77,
        change2: 12,
        marketcap: 118238
      },
      {
        id: 14,
        ticker: 'ONT',
        curr: 'CNY',
        volUsd: 46950092,
        priceUsd1: 1.93,
        priceUsd2: 0.03,
        change1: 18.53,
        change2: 14,
        marketcap: 9129319
      },
      {
        id: 15,
        ticker: 'ZCN',
        curr: 'CNY',
        volUsd: 934230,
        priceUsd1: 9.29,
        priceUsd2: 0.01,
        change1: -0.12,
        change2: -17,
        marketcap: 270832369
      }
    ],
    BTS: [
      {
        id: 16,
        ticker: 'ZCN',
        curr: 'BTS',
        volUsd: 934230,
        priceUsd1: 9.29,
        priceUsd2: 0.01,
        change1: -0.12,
        change2: -17,
        marketcap: 381923
      },
      {
        id: 17,
        ticker: 'ZIL',
        curr: 'BTS',
        volUsd: 10764160,
        priceUsd1: 0.034810,
        priceUsd2: 0.04,
        change1: 37.77,
        change2: 12,
        marketcap: 56361723
      },
      {
        id: 18,
        ticker: 'ONT',
        curr: 'BTS',
        volUsd: 46950092,
        priceUsd1: 1.93,
        priceUsd2: 0.03,
        change1: 18.53,
        change2: 14,
        marketcap: 270832369
      }
    ]
  }
}

const getters = {
  getMarketsField(state) {
    return state.marketsField
  },
  getMarketsList(state) {
    return state.markets
  },
  getFavouritesList(state) {
    return state.favourites
  },
  getCurrentTicker(state) {
    return state.currentTicker
  }
}

const mutations = {
  [types.UPDATE_FAVOURITES](state, { favourites }) {
    state.favourites = favourites
  },
  [types.UPDATE_CURRENT_TICKER](state, { ticker }) {
    state.currentTicker = ticker
  }
}

const actions = {
  toggleFavourite({ state, commit }, { id }) {
    commit(types.UPDATE_FAVOURITES, {
      favourites: Object.assign(
        {}, state.favourites, { [id]: !state.favourites[id] }
      )
    })
  },
  setCurrentTicker({ commit }, { ticker }) {
    commit(types.UPDATE_CURRENT_TICKER, { ticker })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
