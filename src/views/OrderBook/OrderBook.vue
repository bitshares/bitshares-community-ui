<template>
  <div class="order-books">
    <LoadingContainer :loading="fetching">
      <OrderBookLastPrice :quote-symbol="quoteAssetSymbol"/>
      <div class="order-books__layout">
        <OrderBookTable
          :items="orderBook.buying"
          :table-headers="tableHeaders.buy"
          :max-sum="maxSum"
          :anchor="true"
          title="Buying"
          align="left"
          @item-clicked="handleOrderClick('buy', $event)"
        />
        <OrderBookTable
          :items="orderBook.selling"
          :table-headers="tableHeaders.sell"
          :max-sum="maxSum"
          title="Selling"
          align="right"
          @item-clicked="handleOrderClick('sell', $event)"
        />
      </div>
    </LoadingContainer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import OrderBookTable from './OrderBookTable'
import OrderBookLastPrice from './OrderBookLastPrice'
import LoadingContainer from '@/components/LoadingContainer'
import { removePrefix } from '@/helpers/utils'

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
          { title: `Sum, ${this.baseAssetSymbol}`, field: 'sum', align: 'left', disableSort: true },
          { title: ``, field: 'price' }
        ],
        sell: [
          { title: ``, field: 'price', align: 'left' },
          { title: `Sum, ${this.baseAssetSymbol}`, field: 'sum', disableSort: true }
        ]
      }
    },
    ...mapGetters({
      orderBook: 'orderBook/getOrderBook',
      maxSum: 'orderBook/getMaxOrderAmount',
      baseAsset: 'orderBook/getBaseAsset',
      quoteAsset: 'orderBook/getQuoteAsset',
      fetching: 'orderBook/isFetching'
    }),
    baseAssetSymbol() {
      return removePrefix((this.baseAsset && this.baseAsset.symbol) || '')
    },
    quoteAssetSymbol() {
      return removePrefix((this.quoteAsset && this.quoteAsset.symbol) || '')
    }
  },
  methods: {
    ...mapActions({
      setNewOrderData: 'newOrder/setOrderData'
    }),
    handleOrderClick(type, { price, sum }) {
      this.setNewOrderData({ type, price, sum })
    }
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
