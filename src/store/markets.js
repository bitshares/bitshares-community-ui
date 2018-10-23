const state = {
  markets: {
    USD: [
      {
        ticker: 'ZIL',
        volUsd: 10764160,
        priceUsd1: 0.034810,
        priceUsd2: 0.04,
        change1: 37.77,
        change2: 12,
        marketcap: 270832369
      },
      {
        ticker: 'ONT',
        volUsd: 46950092,
        priceUsd1: 1.93,
        priceUsd2: 0.03,
        change1: 18.53,
        change2: 14,
        marketcap: 2708323
      },
      {
        ticker: 'ZCN',
        volUsd: 934230,
        priceUsd1: 9.29,
        priceUsd2: 0.01,
        change1: -0.12,
        change2: -17,
        marketcap: 130532
      },
      {
        ticker: 'CFI',
        volUsd: 36235,
        priceUsd1: 0.023335,
        priceUsd2: 0.02,
        change1: -1.77,
        change2: -11,
        marketcap: 58371323
      },
      {
        ticker: 'AIO',
        volUsd: 1888236,
        priceUsd1: 0.445555,
        priceUsd2: 0.03,
        change1: -0.14,
        change2: -10,
        marketcap: 923832362
      },
      {
        ticker: 'POE',
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
        ticker: 'ZCN',
        volUsd: 934230,
        priceUsd1: 9.29,
        priceUsd2: 0.01,
        change1: -0.12,
        change2: -17,
        marketcap: 2373838
      },
      {
        ticker: 'CFI',
        volUsd: 36235,
        priceUsd1: 0.023335,
        priceUsd2: 0.02,
        change1: -1.77,
        change2: -11,
        marketcap: 29392392
      },
      {
        ticker: 'AIO',
        volUsd: 1888236,
        priceUsd1: 0.445555,
        priceUsd2: 0.03,
        change1: -0.14,
        change2: -10,
        marketcap: 2828471
      },
      {
        ticker: 'POE',
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
        ticker: 'AIO',
        volUsd: 1888236,
        priceUsd1: 0.445555,
        priceUsd2: 0.03,
        change1: -0.14,
        change2: -10,
        marketcap: 270832369
      },
      {
        ticker: 'POE',
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
        ticker: 'ZIL',
        volUsd: 10764160,
        priceUsd1: 0.034810,
        priceUsd2: 0.04,
        change1: 37.77,
        change2: 12,
        marketcap: 118238
      },
      {
        ticker: 'ONT',
        volUsd: 46950092,
        priceUsd1: 1.93,
        priceUsd2: 0.03,
        change1: 18.53,
        change2: 14,
        marketcap: 9129319
      },
      {
        ticker: 'ZCN',
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
        ticker: 'ZCN',
        volUsd: 934230,
        priceUsd1: 9.29,
        priceUsd2: 0.01,
        change1: -0.12,
        change2: -17,
        marketcap: 381923
      },
      {
        ticker: 'ZIL',
        volUsd: 10764160,
        priceUsd1: 0.034810,
        priceUsd2: 0.04,
        change1: 37.77,
        change2: 12,
        marketcap: 56361723
      },
      {
        ticker: 'ONT',
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
  markets(state) {
    return state.markets
  }
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
