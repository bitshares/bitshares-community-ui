import Vue from 'vue'

Vue.directive('maxchars', {
  bind: function(el, binding, vnode) {
    var maxChars = binding.value
    if (!maxChars) return
    
    var handler = function(e) {
      if (e.target.value.length > maxChars) {
        e.target.value = e.target.value.substr(0, maxChars)
      }
    }

    el.addEventListener('input', handler)
  }
})
