import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import SvgIcon from 'vue-svgicon'
Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

Vue.config.productionTip = false

store.dispatch('app/init')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
