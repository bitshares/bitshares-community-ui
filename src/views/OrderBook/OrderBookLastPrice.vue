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
    width: 9.375rem;
    left: calc(50% - 4.6875rem);
  }
  .order-book__priceTitle {
    color: config('colors.button-text-disabled');
    font-size: config('textSizes.sm');
    margin-bottom: 0.8125rem;
  }
  .order-book__priceValue {
    font-weight: config('fontWeights.bold')
  }
</style>
