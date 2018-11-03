<template>
  <div class="order-books">
    <OrderBookLastPrice/>
    <div class="order-books__layout">
      <OrderBookTable
        :items="orderBook.buying"
        :table-headers="tableHeaders.buy"
        :max-sum="getMaxSum(orderBook.buying)"
        title="Byuing"
        align="left"
      />
      <OrderBookTable
        :items="orderBook.selling"
        :table-headers="tableHeaders.sell"
        :max-sum="getMaxSum(orderBook.selling)"
        title="Selling"
        align="right"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import orderBy from 'lodash/orderBy'
import OrderBookTable from './OrderBookTable'
import OrderBookLastPrice from './OrderBookLastPrice'

export default {
  components: {
    OrderBookTable,
    OrderBookLastPrice
  },
  data() {
    return {
      tableHeaders: {
        buy: [
          { title: 'Sum, BTC', field: 'sum', align: 'left' },
          { title: '', field: 'price' }
        ],
        sell: [
          { title: '', field: 'price', align: 'right' },
          { title: 'Sum, BTC', field: 'sum' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      orderBook: 'books/getOrderBook'
    })
  },
  methods: {
    getMaxSum(items) {
      return orderBy(items, 'sum', 'desc')[0].sum
    }
  }
}
</script>
<style lang="scss">
  .order-books {
    position: relative;
  }
  .order-books__layout {
    display: flex;
    justify-content: center;
  }
</style>
