<template>
  <div class="order-price">
    <div class="order-price-title">{{ tradeItem.base }}</div>
    <div class="order-price-value">{{ tradeItem.value }}</div>
    <div class="order-price-max">max {{ tradeItem.max }}</div>
    <div
      :class="{
        'order-points--buy': orderType === 'buy',
        'order-points--sell': orderType === 'sell'
      }"
      class="order-points"
    >
      <div class="order-points-first">{{ tradeItem.point1 }}</div>
      <div class="order-points-second">{{ tradeItem.point2 }}</div>
      <div class="order-percent">%</div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    tradeItem: {
      type: Object,
      default() {
        return {}
      }
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
    margin-top: 20px;
    display: inline-block;
    width: 50%;
    text-align: center;
    position: relative;

    .order-price-title {
      font-size: config('textSizes.sm');
      color: config('colors.inactive');
    }
    .order-price-value {
      font-size: config('textSizes.xl');
      color: config('colors.white');
      padding-top: .3rem;
    }
    .order-price-max {
      font-size: config('textSizes.sm');
      color: config('colors.white');
    }
    .order-points {
      color: config('colors.inactive');
      text-align: right;
      position: absolute;
      top: 5px;

      .order-percent {
        display: none;
      }
      &--buy {
        right: 8px;
        .order-percent {
          display: block;
          position: absolute;
          color: config('colors.inactive');
          left: 23px;
          top: 18px;
        }
      }
      &--sell {
        left: 8px;
      }
      .order-points-first {
        margin-bottom: 16px;
      }
    }
  }
</style>
