import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import createPersistedState from 'vuex-persistedstate'
import vuexBitsharesModules from 'vuex-bitshares'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    ...vuexBitsharesModules
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
        removeItem: key => Cookies.remove(key)
      },
      paths: ['acc.userId']
    })
  ]
})

export default store
