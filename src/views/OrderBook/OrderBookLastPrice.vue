<template>
  <div class="order-book__price">
    <div class="order-book__priceTitle">Last Price</div>
    <div class="order-book__priceValue">{{ lastPrice }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      price: 'books/getLastPrice',
      currentTicker: 'books/getCurrentTicker'
    }),

    lastPrice() {
      return `${this.price} ${this.currentTicker}`
    }
  }
}
</script>
<style lang="scss">
  .order-book__price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .order-book__priceTitle {
    color: config('colors.button-text-disabled');
    font-size: config('textSizes.sm');
  }
</style>
