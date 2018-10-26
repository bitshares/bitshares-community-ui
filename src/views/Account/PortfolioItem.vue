<template>
  <div>
    <span>{{ item.tiker }}</span>
    <span v-show="isBalancesMode">{{ item.tokens }}</span>
    <span v-show="isBalancesMode">{{ item.fiatValue }}</span>
    <span v-show="isBalancesMode">{{ item.share }}%</span>
    <span v-show="isPricesMode">{{ item.tokenPrice }}</span>
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
    formattedTokenPrice() {
      return this.preciseFiatValue(this.tokenPrice)
    },
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

.grid-items div {
  color: config('colors.text-primary');
  padding: config('padding.grid-table');
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  line-height: 5px;
  padding-left: config('padding.0');
  padding-right: config('padding.0');
  transition: background-color 0.15s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2)
  }
}

.grid-items span {
    padding: 0px 0px;
    font-size: config('textSizes.sm');
    &:not(:first-child) {
      text-align: right;
    }
}

</style>
