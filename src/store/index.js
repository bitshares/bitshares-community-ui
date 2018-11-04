import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import portfolio from './modules/portfolio'
import books from './books'
import createPersistedState from 'vuex-persistedstate'
import vuexBitsharesModules from 'vuex-bitshares'
import Cookies from 'js-cookie'
import paths from './cachedPaths'
import marketsMonitor from './modules/marketsMonitor'

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
    ...vuexBitsharesModules
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
        removeItem: key => Cookies.remove(key)
      },
      paths: [...paths]
    })
  ]
})

export default store
