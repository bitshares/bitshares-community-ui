<template>
  <div
    v-click-outside="handleDropdownClose"
    class="dropdown sm:w-100 sm:h-100"
    @click="handleDropdownClick"
  >
    <svgicon
      name=""
      width="24"
      height="24"
      class="dropdown"
    />
    <div
      :class="dropdownActive ? 'dropdown--active' : 'dropdown--inactive'"
      class="dropdown-block"
    >
      <div
        v-for="item in menuItems"
        :key="item"
        class="dropdown-item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import '@icons/arrowDown'

export default {
  directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) { warn += `Found in component '${compName}'` }
          console.warn(warn)
        }
        // Define the Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        document.addEventListener('click', handler)
      },
      unbind: function(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  },
  props: {
    menuItems: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      dropdownActive: false
    }
  },
  computed: {

  },
  methods: {
    handleDropdownClick() {
      this.dropdownActive = !this.dropdownActive
    },
    handleDropdownClose() {
      this.dropdownActive = false
    }
  }
}
</script>

<style lang="scss">
.dropdown {
  color: color;
}

.dropdown--active {
  display: block;
  color: config('colors.text-primary');
  position:fixed;
  z-index: 99;
  transform: translate(-92%, 10%);
  background-color: config('colors.mobile-footer');
}

.dropdown--inactive {
  display: none;
}

.dropdown-item {
  height: 3rem;
  font-size: 1.125rem;
  font-weight: 500;
  padding: 1.063rem;
  width: 18.750rem;
  text-align: center;
  border-bottom: solid;
  border-bottom-width: 0.063rem;
  border-bottom-color: config('colors.divider');
}

.dropdown-item:hover {
  cursor:pointer;
  color: config('colors.table-bg');
  background-color: config('colors.text-primary');
}
</style>
