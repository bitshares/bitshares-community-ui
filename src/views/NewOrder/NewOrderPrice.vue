<template>
  <div class="order-price">
    <div class="order-price-title">{{ title }}</div>
    <div class="order-price-value">0</div>
    <div class="order-price-max">max 0</div>
  </div>
</template>
<script>

export default {
  props: {
    base: {
      type: String,
      default: 'BTC'
    },
    orderType: {
      type: String,
      default: 'buy'
    }
  },
  data() {
    return {}
  },
  computed: {
    title() {
      return this.orderType === 'buy' ? `Spend ${this.base}` : `Get USD`
    }
  }
}
</script>
<style lang="scss">
  .order-price {
    margin-top: 1.25rem;
    margin-left: 2rem;
    margin-right: 2rem;
    display: inline-block;
    text-align: center;
    position: relative;

    .order-price-title {
      font-size: 0.6875rem;
      color: config('colors.inactive');
    }
    .order-price-value {
      font-size: config('textSizes.xl');
      color: config('colors.white');
      padding-top: .3rem;
    }
    .order-price-max {
      font-size: 0.6875rem;
      color: config('colors.white');
    }
  }
</style>
