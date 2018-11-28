<template>
  <div
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
      class="dropdown_triangle"
      v-show="expanded"
    />
    <div
      :class="{ 'dropdown-block--inactive': !expanded }"
      :style="styleObject"
      class="dropdown-block"
    >
      <div
        v-for="item in menuItems"
        :key="item"
        class="dropdown-item w-screen sm:w-64"
        @click="$emit(item)"
      >
        <div class="item-name">{{ item }}</div>
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
      expanded: false
    }
  },
  computed: {
    styleObject() {
      return {
        height: (this.expanded ? this.menuItems.length * 2.5 : 0) + 'rem'
      }
    }
  },
  methods: {
    handleDropdownClick() {
      this.expanded = !this.expanded
    },
    handleDropdownClose() {
      this.expanded = false
    }
  }
}
</script>

<style lang="scss">

.dropdown {
  position: relative;
  user-select: none;
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
  z-index: 2;
  margin-top: 0.75rem;
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
  margin-top: 0.2rem;
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
  &:last-child {
    border-bottom: none;
  }
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
