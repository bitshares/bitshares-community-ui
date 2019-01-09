import Vue from 'vue'

export default {
  error(text) {
    Vue.prototype.$noty.error(text)
  },
  warning(text) {
    Vue.prototype.$noty.warning(text)
  },
  success(text) {
    Vue.prototype.$noty.success(text)
  },
  info(text) {
    Vue.prototype.$noty.info(text)
  }
}
