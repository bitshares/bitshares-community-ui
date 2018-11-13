<template>
  <div class="order-book__price">
    <div class="order-book__priceTitle">Price, {{ quoteSymbol }}</div>
    <!-- <div class="order-book__priceValue">{{ price }}</div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    quoteSymbol: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      price: 'books/getLastPrice'
    })
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
    background: config('colors.card-background');
    z-index: 100;
    top: 2px;
    height: 13px;
  }
  .order-book__priceTitle {
    color: config('colors.button-text-disabled');
    font-size: config('textSizes.sm');
    margin-bottom: 0.8125rem;
  }
  .order-book__priceValue {
    font-weight: config('fontWeights.bold');
    color: config('colors.white');
  }
</style>
