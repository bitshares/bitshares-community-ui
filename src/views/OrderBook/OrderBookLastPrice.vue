<template>
  <div class="order-book__price">
    <div class="order-book__priceTitle">Price, USD</div>
    <div class="order-book__priceValue">{{ price }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
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
    margin-top: 0.125rem;
    position: absolute;
    width: 10.625rem;
    left: calc(50% - 5.3125rem);
    background: config('colors.card-background');
    z-index: 100;
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
