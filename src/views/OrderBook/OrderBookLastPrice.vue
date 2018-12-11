<template>
  <div
    :class="{'order-book__price--row': type === 'row'}"
    class="order-book__price"
  >
    <div
      v-if="type === 'title'"
      class="order-book__priceTitle"
    >
      Price, {{ quoteSymbol }}
    </div>
    <div
      v-if="type === 'row'"
      class="order-book__price-row"
    >
      <div class="order-book__price-row--left">{{ sum }}</div>
      <div class="order-book__price-row--center">{{ price }}</div>
      <div class="order-book__price-row--right">{{ sum }}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getFloatCurrency } from '@/helpers/utils'

export default {
  props: {
    quoteSymbol: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'title'
    }
  },
  computed: {
    ...mapGetters({
      price: 'orderBook/getLastPrice',
      lastOrder: 'orderBook/getLastOrder'
    }),
    price() {
      return this.lastOrder && getFloatCurrency(this.lastOrder.price)
    },
    sum() {
      return this.lastOrder && getFloatCurrency(this.lastOrder.sum)
    }
  }
}
</script>
<style lang="scss">
  .order-book__price {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    background: config('colors.card-background');
    z-index: 100;
    width: 7.625rem;
    left: calc(50% - 3.8125rem);
    z-index: 2;
    top: 1.73rem;
    height: 0.7rem;

    &--row {
      width: 100%;
      top: 42px;
      left: 0;
      padding: 2px 0;
      z-index: 100;
    }
  }
  .order-book__priceTitle {
    color: config('colors.inactive');
    font-size: config('textSizes.xs-sm');
    margin-bottom: 0.8125rem;
  }
  .order-book__priceValue {
    font-weight: config('fontWeights.bold');
    color: config('colors.white');
  }
  .order-book__price-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 7px;
    text-align: center;
    color: config('colors.primary');
    font-size: config('textSizes.sm');

    &--left {
      margin-left: 1rem;
    }
    &--right {
      margin-right: 1rem;
    }
    &--center {
      font-size: config('textSizes.base');
      letter-spacing: -0.0425px;
      font-weight: config('fontWeights.extrabold');
    }
  }
</style>
