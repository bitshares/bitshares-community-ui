<template>
  <div
    @click="handleDropdownClick"
  >
    <svgicon
      name="burger"
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
          width="12"
          height="12"
          class="submenu-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import '@icons/arrowDown'
import '@icons/burger'

export default {
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
  transform: translate(0, 0.1875rem) rotate(-90deg);
  color: config('colors.mobile-footer');
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
  padding: 0.9375rem 0 0.9375rem 0;
}

.dropdown--inactive {
  display: none;
}

.triangle {
  width: 0;
  border-left: 0.625rem solid transparent;
  border-right: 0.625rem solid transparent;
  border-bottom: 0.625rem solid config('colors.mobile-footer');
  margin: 0 0 0 auto;
  transform: translate(-0.9375rem, -1.5625rem)
}

.dropdown-item {
  display:flex;
  justify-content: space-between;
  height: 3rem;
  font-size: 1.125rem;
  font-weight: 500;
  padding: 1.063rem 0.4rem 1.063rem 1.063rem;
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
}

</style>
