<template>
  <div class="tabs">
    <div
      :class="{'tab-hader--centered': centered}"
      class="tabs-header">
      <div @click="handleTabClick('favourites')">
        <Star
          v-if="currencyMode"
          :active="isActiveFavourites"
          class="tabs__favourite"
        />
      </div>
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :style="{ width: currencyMode ? 'auto' : tabWidth + '%' }"
        :class="{
          'tab--active': active === tab,
          'tab--currency': currencyMode
        }"
        class="tab"
        @click="handleTabClick(index)"
      >
        {{ format(tab) }}
      </div>
    </div>
    <slot :name="tabs[activeTabIndex]" />
  </div>
</template>

<script>
import Star from '@/components/Star'
import { removePrefix } from '@/helpers/utils'

export default {
  components: {
    Star
  },
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
    },
    active: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      activeTabIndex: 0
      // activeFavourite: false
    }
  },
  computed: {
    tabWidth() {
      return 100 / this.tabs.length
    },
    isActiveFavourites() {
      return this.active === 'favourites'
    }
  },
  methods: {
    handleTabClick(index) {
      this.activeTabIndex = index
      this.$emit('change', this.tabs[index] || 'favourites')

      // // this.tabs[index] ? this.activeFavourite = false : this.activeFavourite = true
    },
    format(value) {
      if (!this.currencyMode) return value
      return removePrefix(value, 'OPEN.')
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  user-select: none;
}

.tabs-header {
  display: flex;
  list-style-type: none;
  padding: 0;
  text-transform: uppercase;
  &--centered {
    justify-content: center;
  }

  .tabs__favourite {
    margin: 0.3125rem -0.3125rem 0 .6875rem;
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
    margin-left: 1rem;;
    padding: 0.25rem 0;
    border-bottom: none;
    font-size: 1.25rem;
    letter-spacing: -1px;
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
