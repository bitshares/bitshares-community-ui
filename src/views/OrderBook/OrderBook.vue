<template>
  <div class="order-books">
    <LoadingContainer :loading="fetching">
      <OrderBookLastPrice :quote-symbol="quoteSymbol"/>
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
    </LoadingContainer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import OrderBookTable from './OrderBookTable'
import OrderBookLastPrice from './OrderBookLastPrice'
import LoadingContainer from '@/components/LoadingContainer'

export default {
  components: {
    OrderBookTable,
    OrderBookLastPrice,
    LoadingContainer
  },
  computed: {
    tableHeaders() {
      return {
        buy: [
          { title: `Sum, ${this.baseSymbol}`, field: 'sum', align: 'left' },
          { title: ``, field: 'price' }
        ],
        sell: [
          { title: ``, field: 'price', align: 'left' },
          { title: `Sum, ${this.baseSymbol}`, field: 'sum' }
        ]
      }
    },
    ...mapGetters({
      orderBook: 'orderBook/getOrderBook',
      maxSum: 'orderBook/getMaxOrderAmount',
      baseSymbol: 'orderBook/getBaseSymbol',
      quoteSymbol: 'orderBook/getQuoteSymbol',
      fetching: 'orderBook/isFetching'
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
