<template>
  <MarketsListItemPrices
    :item="item"
    :change-value7="changeValue7"
    :change-value24="changeValue24"
    :vol-usd="volUsd"
    :is-favourite="isFavourite"
    :market-cap="marketCap"
    :expand-mode="expandMode"
    @change="changeFavourite"
    @click.native="handleClick"
  />
</template>
<script>
import { mapActions } from 'vuex'
import MarketsListItemPrices from './MarketsListItemPrices'
import { amountValueShortener } from '@/helpers/utils'
import round from 'lodash/round'

export default {
  components: { MarketsListItemPrices },
  props: {
    item: {
      type: Object,
      required: true
    },
    currentBase: {
      type: String,
      required: true
    },
    expandMode: {
      type: Boolean,
      default: false
    },
    isFavourite: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    volUsd() {
      return amountValueShortener(this.item.usdVolume)
    },
    marketCap() {
      // return amountValueShortener(this.item.marketcap)
      return 0
    },
    changeValue7() {
      return this.getChangeValue({ price: round(this.item.change7d, 1) })
    },
    changeValue24() {
      return this.getChangeValue({ price: round(this.item.change24h, 1) })
    }
  },
  methods: {
    ...mapActions({
      toggleFavourite: 'marketsMonitor/toggleFavourite',
      activateOrderBook: 'orderBook/initialize',
      setNewOrderMarket: 'newOrder/setMarket'
    }),
    handleClick() {
      this.activateOrderBook({
        baseSymbol: this.item.base,
        quoteSymbol: this.item.ticker
      })
      this.setNewOrderMarket({
        base: this.item.base,
        quote: this.item.ticker
      })
    },
    getChangeValue({ price }) {
      if (!price) return '0%'
      return (+price >= 0) ? `+${price}%` : `${price}%`
    },
    changeFavourite({ item }) {
      this.toggleFavourite({ base: item.base, quote: item.ticker })
    }
  }
}
</script>
