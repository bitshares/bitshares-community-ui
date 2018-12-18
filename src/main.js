import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import toast from './helpers/toast'
import './directives/'
import SvgIcon from 'vue-svgicon'
import VueClipboard from 'vue-clipboard2'
import PerfectScrollbar from 'vue2-perfect-scrollbar'

Vue.prototype.$toast = toast
Vue.use(VueClipboard)
Vue.use(SvgIcon, { tagName: 'svgicon' })
Vue.use(PerfectScrollbar)

window.crypto.randomBytes = require('randombytes')

Vue.config.productionTip = false

store.dispatch('app/init')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
