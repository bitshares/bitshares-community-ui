<template>
  <div class="portfolio">
    <div class="portfolio-options">
      <div
        class="options-header">
        <div
          :class="active1 === true ? 'option--active' : ''"
          class="option"
          @click="handleClick1()"
        >
          {{ text1 }}
        </div>
      </div>
      <div
        class="options-header">
        <div
          :class="active2 === true ? 'option--active' : ''"
          class="option"
          @click="handleClick2()"
        >
          {{ text2 }}
        </div>
      </div>
    </div>
    <div class="grid">
      <span><strong>Asset</strong></span>
      <span><strong>$Price</strong></span>
      <span><strong>24h%</strong></span>
      <span><strong>7d%</strong></span>
    </div>
    <PortfolioItem :items="items" />
  </div>
</template>

<script>
import PortfolioItem from './PortfolioItem.vue'

export default {
  components: { PortfolioItem },
  props: {
    text1: {
      default: 'SHOW ALL ASSETS',
      type: String
    },
    text2: {
      default: 'SHOW BALANCES',
      type: String
    }
  },
  data() {
    return {
      active1: false,
      active2: false,
      items: [{
        name: 'BTC',
        token: 0.345,
        fiatValue: 2345,
        percent: 12
      },
      {
        name: 'ETH',
        token: 0.345,
        fiatValue: 2345,
        percent: 12
      },
      {
        name: 'LTC',
        token: 0.345,
        fiatValue: 2345,
        percent: 12
      },
      {
        name: 'BTS',
        token: 0.345,
        fiatValue: 2345,
        percent: 12 },
      {
        name: 'USD',
        token: 0.345,
        fiatValue: 2345,
        percent: 12 },
      {
        name: 'XRP',
        token: 0.345,
        fiatValue: 2345,
        percent: 12 },
      {
        name: 'EOS',
        token: 0.345,
        fiatValue: 2345,
        percent: 12 }]
    }
  },
  methods: {
    handleClick1() {
      this.active1 = !this.active1
    },
    handleClick2() {
      this.active2 = !this.active2
    }
  }
}
</script>

<style scoped lang="scss">
.portfolio {
  font-family: config("fonts.gotham");
}

.portfolio-options {
  font-family: config("fonts.gotham");
  color: config('colors.text-primary');
  display: flex;
  justify-content: space-between;
}

.options-header {
  padding: 0;
  text-transform: uppercase;
  &--centered {
    justify-content: center;
  }
}

.options-header .option {
  @apply font-gotham text-base py-3;
  @apply cursor-pointer;
  color: config('colors.tab-header');
  font-size: config('textSizes.xxs-xs');
  text-align: center;
  line-height: 0px;
  &--active {
    @apply cursor-default;
    color: config('colors.tab-active')!important;
    border-bottom: 2px solid config('colors.tab-header');
    border-bottom-color: config('colors.tab-active')!important;
  }
  &:hover {
    color:config('colors.tab-hover');
      border-bottom: 2px solid config('colors.tab-header');
    border-bottom-color: config('colors.tab-hover');
  }
}

.grid {
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  padding: config('padding.grid-table');
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.grid span {
    padding: 8px 4px;
    font-size: config('textSizes.sm');
}

.grid span strong {
    font-size: config('textSizes.xs-sm');
}

</style>
