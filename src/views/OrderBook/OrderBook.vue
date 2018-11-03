<template>
  <div class="order-books">
    <OrderBookLastPrice/>
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
    }),
    maxSum() {
      const maxFromBuy = orderBy(this.orderBook.buying, 'sum', 'desc')[0].sum
      const maxFromSell = orderBy(this.orderBook.selling, 'sum', 'desc')[0].sum

      return maxFromBuy > maxFromSell ? maxFromBuy : maxFromSell
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
