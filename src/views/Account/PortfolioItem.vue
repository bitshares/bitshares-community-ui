<template>
  <div class="portfolio-item">
    <span>{{ item.tiker }}</span>
    <span v-show="isBalancesMode">{{ formattedTokens }}</span>
    <span v-show="isBalancesMode">{{ formattedFiatValue }}</span>
    <span v-show="isBalancesMode">{{ item.share }}%</span>
    <span v-show="isPricesMode">{{ formattedTokenPrice }}</span>
    <span v-show="isPricesMode">{{ item.change1.toFixed(0).toString() }}%</span>
    <span v-show="isPricesMode">{{ item.change7.toFixed(0).toString() }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  computed: {
    isBalancesMode() {
      return this.mode === 'balances'
    },
    isPricesMode() {
      return this.mode === 'prices'
    },
    formattedTokens() {
      return this.item.tokens.toFixed(2)
    },
    formattedTokenPrice() {
      return this.preciseFiatValue(this.item.tokenPrice || 0)
    },
    formattedFiatValue() {
      return this.preciseFiatValue(this.item.fiatValue || 0)
    }
  },
  methods: {
    preciseFiatValue(value, precision = 1) {
      if (!value) return 0
      if (value > 10) return Math.floor(value)
      if (value > 0.1) return value.toFixed(precision)
      return value.toFixed(2)
    }
  }
}
</script>

<style scoped lang="scss">

.portfolio-item {
  color: config('colors.text-primary');
  padding: config('padding.grid-table');
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-left: 0;
  padding-right: 0;
  transition: background-color 0.15s ease;
  padding: config('padding.grid-table') 1rem config('padding.grid-table') 0.6rem;
  &:hover {
    position: relative;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.portfolio-item span {
    padding: 0px 0px;
    font-size: config('textSizes.sm');
    overflow: hidden;
    text-overflow: ellipsis;
    &:not(:first-child) {
      text-align: right;
    }
}

</style>
