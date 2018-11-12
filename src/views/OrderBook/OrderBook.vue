<template>
  <div class="order-books">
    <!-- <OrderBookLastPrice/> -->
    <div class="order-books__layout">
      <OrderBookTable
        :items="orderBook.buying"
        :table-headers="tableHeaders.buy"
        :max-sum="maxSum"
        title="Buying"
        align="left"
      />
      <OrderBookTable
        :items="orderBook.selling"
        :table-headers="tableHeaders.sell"
        :max-sum="maxSum"
        title="Selling"
        align="right"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import OrderBookTable from './OrderBookTable'
import OrderBookLastPrice from './OrderBookLastPrice'

export default {
  components: {
    OrderBookTable,
    OrderBookLastPrice
  },
  computed: {
    tableHeaders() {
      return {
        buy: [
          { title: `Sum, ${this.baseSymbol}`, field: 'sum', align: 'left' },
          { title: 'Price', field: 'price' }
        ],
        sell: [
          { title: 'Price', field: 'price', align: 'left' },
          { title: `Sum, ${this.baseSymbol}`, field: 'sum' }
        ]
      }
    },
    ...mapGetters({
      orderBook: 'books/getOrderBook',
      maxSum: 'books/getMaxOrderAmount',
      baseSymbol: 'books/getBaseSymbol'

    })
  }
}
</script>
<style lang="scss">
  .order-books {
    position: relative;
    height: 100%;
  }
  .order-books__layout {
    display: flex;
    justify-content: center;
    height: 100%;
  }
</style>
