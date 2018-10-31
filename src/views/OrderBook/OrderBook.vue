<template>
  <div class="order-books">
    <div class="order-books__layout">
      <OrderBookTable
        :items="orderBook.buying"
        title="Byuing"
      />
      <OrderBookTable
        :items="orderBook.selling"
        title="Selling"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import OrderBookTable from './OrderBookTable'

export default {
  components: {
    OrderBookTable
  },
  computed: {
    ...mapGetters({
      orderBook: 'books/getOrderBook'
    })
  }
}
</script>
<style lang="scss">
  .order-books__layout {
    display: flex;
    justify-content: center;
  }
</style>
