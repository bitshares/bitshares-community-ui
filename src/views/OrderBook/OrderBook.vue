<template>
  <div class="order-books">
    <div class="order-books__layout">
      <OrderBookTable
        :items="orderBook.buying"
        title="Byuing"
        align="left"
        :table-headers="tableHeaders.buy"
      />
      <OrderBookTable
        :items="orderBook.selling"
        title="Selling"
        align="right"
        :table-headers="tableHeaders.sell"
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
  data() {
    return {
      tableHeaders: {
        buy: [
          { title: 'Sum, BTC', field: 'sum', align: 'left' },
          { title: '', field: 'price', align: this.align }
        ],
        sell: [
          { title: '', field: 'price', align: 'right' },
          { title: 'Sum, BTC', field: 'sum', align: this.align }
        ]
      }
    }
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
