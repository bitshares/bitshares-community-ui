<template>
  <div class="order-price">
    <div class="order-price-title">{{ currentBase }}</div>
    <div class="order-price-value">0</div>
    <div class="order-price-max">max 0</div>
  </div>
</template>
<script>

export default {
  props: {
    currentBase: {
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
  }
}
</script>
<style lang="scss">
  .order-price {
    margin-top: 1.25rem;
    display: inline-block;
    width: 50%;
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
