import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import vuexBitshares from 'vuex-bitshares'

Vue.use(Vuex)
// TODO: user vuex-bitshares here

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app
  }
})

vuexBitshares(store)

export default store
