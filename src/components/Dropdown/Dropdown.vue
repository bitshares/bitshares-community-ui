<template>
  <div
    v-click-outside="handleDropdownClose"
    @click="handleDropdownClick"
  >
    <svgicon
      name="expand"
      width="24"
      height="24"
      class="dropdown-icon"
    />
    <div
      :class="dropdownActive ? 'dropdown--active' : 'dropdown--inactive'"
      class="dropdown-block "
    >
      <div class="triangle" />
      <div
        v-for="item in menuItems"
        :key="item"
        class="dropdown-item w-screen sm:w-64"
        @click="$emit(item)"
      >
        <div class="item-name">{{ item }}</div>
        <svgicon
          name="arrowDown"
          width="15"
          height="15"
          class="submenu-icon"
        />
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
.submenu-icon {
  transform: rotate(-90deg);
  color: config('colors.mobile-footer');
  text-align: right;
}

.dropdown-icon {
  color: config('colors.text-primary');
}

.dropdown-icon:hover {
  cursor: pointer;
  opacity: 0.8
}

.dropdown--active {
  display: block;
  color: config('colors.text-primary');
  position:fixed;
  z-index: 2;
  transform: translate(-92%, 10%);
  background-color: config('colors.mobile-footer');
  padding: 15px 0 15px 0;
}

.dropdown--inactive {
  display: none;
}

.triangle {
  width: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid config('colors.mobile-footer');
  margin: 0px 0 0 auto;
  transform: translate(-15px, -25px)
}

.dropdown-item {
  display:flex;
  justify-content: space-between;
  height: 3rem;
  font-size: 1.125rem;
  font-weight: 500;
  padding: 1.063rem;
  border-bottom: solid;
  border-bottom-width: 0.063rem;
  border-bottom-color: config('colors.divider');
}

.dropdown-item:hover {
  cursor:pointer;
  color: config('colors.table-bg');
  background-color: config('colors.text-primary');
}

.item-name {
  margin: 0 auto;
  transform: translate(0.4837rem); /* translates text to 7.5px (half the icon width) to right */
}

</style>
