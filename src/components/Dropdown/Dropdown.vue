<template>
  <div
    v-click-outside="closeDropdown"
    :class="{ 'dropdown--mobile': mobile }"
    class="dropdown"
    @click="handleDropdownClick"
  >
    <svgicon
      name="burger"
      width="24"
      height="24"
      class="dropdown-icon"
    />
    <div
      v-show="expanded"
      class="dropdown_triangle"
    />
    <div
      :class="{ 'dropdown-block--inactive': !expanded }"
      :style="styleObject"
      class="dropdown-block"
    >
      <div
        v-if="mobile"
        class="dropdown-item dropdown-item--title"
      >
        <span>{{ title }}</span>
        <svgicon
          name="cancel"
          width="23"
          height="23"
          color="white"
        />
      </div>
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="{ 'disabled': item.disabled }"
        class="dropdown-item w-screen sm:w-64"
        @click="handleItemClick(item.event)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import '@icons/burger'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    mobile: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      expanded: false
    }
  },
  computed: {
    styleObject() {
      const itemHeight = this.mobile ? 3 : 2.5
      const itemsNum = this.mobile ? this.items.length + 1 : this.items.length
      return {
        height: (this.expanded ? itemsNum * itemHeight : 0) + 'rem'
      }
    }
  },
  methods: {
    handleDropdownClick() {
      this.expanded = !this.expanded
    },
    handleItemClick(eventName) {
      this.$emit('clicked', eventName)
    },
    closeDropdown() {
      if (this.expanded) this.expanded = false
    }
  }
}
</script>

<style lang="scss">

.dropdown {
  position: relative;
  user-select: none;
}

.dropdown--mobile {
  .dropdown-block {
    margin-top: 0;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
  .dropdown-item {
    height: 3rem;
    padding: 0 1rem;
    &--title {
      justify-content: space-between;
      span {
        margin-top: -0.3rem;
        font-size: 1rem;
        font-family: Gotham_Pro_Medium;
      }
      &:hover {
        background-color: inherit;
      }
    }
  }
}

.dropdown-icon {
  color: config('colors.text-primary');
  &:hover {
    cursor: pointer;
    opacity: 0.8
  }
}

.dropdown-block {
  display: block;
  color: config('colors.text-primary');
  position:absolute;
  right: 0;
  top: 100%;
  z-index: 3;
  margin-top: 1.75rem;
  background-color: config('colors.mobile-footer');
  transition: height 0.15s, opacity 0.15s;
  overflow: hidden;
  &--inactive {
    height: 0;
    opacity: 0;
  }
}

.dropdown_triangle {
  border-left: 0.625rem solid transparent;
  border-right: 0.625rem solid transparent;
  border-bottom: 0.625rem solid config('colors.mobile-footer');
  position: absolute;
  right: 0.1rem;
  top: 100%;
  margin-top: 1.2rem;
}

.dropdown-item {
  display:flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.2rem;
  height: 2.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  border-bottom: 0.063rem solid config('colors.divider');
  transition: background-color 0.1s, color 0.1s;
  text-transform: uppercase;
  &:last-child {
    border-bottom: none;
  }
}

.dropdown-item:hover {
  cursor:pointer;
  color: config('colors.table-bg');
  background-color: config('colors.text-primary');
}
</style>
