<template>
  <div class="tabs">
    <div
      :class="{'tab-hader--centered': centered}"
      class="tabs-header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :style="{ width: tabWidth + '%' }"
        :class="{
          'tab--active': activeTabIndex === index,
          'tab--currency': currencyMode
        }"
        class="tab"
        @click="handleTabClick(index)"
      >
        {{ tab }}
      </div>
    </div>
    <slot :name="tabs[activeTabIndex]" />
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      default: () => [],
      type: Array
    },
    centered: {
      default: true,
      type: Boolean
    },
    currencyMode: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      activeTabIndex: 0
    }
  },
  computed: {
    tabWidth() {
      return 100 / this.tabs.length
    }
  },
  methods: {
    handleTabClick(index) {
      this.activeTabIndex = index
      this.$emit('change', this.tabs[index])
    }
  }
}
</script>

<style lang="scss" scoped>

.tabs-header {
  display: flex;
  list-style-type: none;
  padding: 0;
  text-transform: uppercase;
  &--centered {
    justify-content: center;
  }
}

.tabs-header .tab {
  @apply font-gotham text-base py-3;
  @apply float-left cursor-pointer;
  color: config('colors.tab-header');
  border-bottom: 3px solid config('colors.tab-header');
  text-align: center;
  transition: color 0.2s, border-color 0.2s;

  &--active {
    @apply cursor-default;
    color: config('colors.tab-active')!important;
    border-bottom-color: config('colors.tab-active')!important;
  }

  &--currency {
    margin: 0 7px;
    margin-top: -7px;
    border-bottom: none;
    padding-bottom: .25rem;
    font-family: config('fonts.gotham-medium');
  }

  &:hover {
    color:config('colors.tab-hover');
    border-bottom-color: config('colors.tab-hover');
  }
}
.tabs-header .tab.tab--currency.tab--active {
  border-bottom: 1px solid;
  border-bottom-color: config('colors.tab-active');
}
.markets--expanded {
  .tabs-header .tab.tab--currency {
    margin-right: 25px;
  }
}
</style>
