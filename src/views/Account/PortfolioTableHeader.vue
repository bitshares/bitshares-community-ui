<template>
  <div class="portfolio-table-header">
    <span>Tiker</span>
    <span v-if="isBalancesMode">Tokens</span>
    <span v-if="isBalancesMode">$Value</span>
    <span v-if="isBalancesMode">Share</span>
    <span v-if="isPricesMode">$Price</span>
    <span v-if="isPricesMode">24h%</span>
    <span v-if="isPricesMode">7d%</span>
  </div>
</template>

<script>
export default {
  props: {
    activeSort: {
      type: Object,
      required: false,
      default: () => {}
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
    }
  }
}
</script>

<style scoped lang="scss">

.portfolio-table-header {
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  padding-bottom: config('padding.2');
  opacity: 0.5;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.portfolio-table-header span {
    padding: 0px 0px;
    font-size: config('textSizes.xs-sm');
    &:not(:first-child) {
      text-align: right;
    }
}

</style>
