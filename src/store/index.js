import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import portfolio from './modules/portfolio'
import books from './modules/books'
import createPersistedState from 'vuex-persistedstate'
import vuexBitshares from 'vuex-bitshares'
import Cookies from 'js-cookie'
import paths from './cachedPaths'
import marketsMonitor from './modules/marketsMonitor'
import orderHistory from './modules/orderHistory'

const { modules, plugins } = vuexBitshares
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    marketsMonitor,
    portfolio,
    books,
    orderHistory,
    ...modules
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
        removeItem: key => Cookies.remove(key)
      },
      paths: [...paths]
    }),
    plugins.fetchingAssets
  ]
})

export default store
