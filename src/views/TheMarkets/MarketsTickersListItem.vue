<template>
  <MarketsTickersListItemPrices
    :item="item"
    :change-value7="changeValue7"
    :change-value24="changeValue24"
    :vol-usd="volUsd"
    :is-favourite="isFavourite"
    :market-cap="marketCap"
    :expand-mode="expandMode"
    @change="changeFavourite"
  />
</template>
<script>
import { mapActions } from 'vuex'
import MarketsTickersListItemPrices from './MarketsTickersListItemPrices'
import { getVolumeFormat } from '@/helpers/utils'

export default {
  components: { MarketsTickersListItemPrices },
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
      return getVolumeFormat(this.item.usdVolume)
    },
    marketCap() {
      // return getVolumeFormat(this.item.marketcap)
      return 0
    },
    changeValue7() {
      return this.getChangeValue({ price: this.item.change7d || 0 })
    },
    changeValue24() {
      return this.getChangeValue({ price: this.item.change24h })
    }
  },
  methods: {
    ...mapActions('markets', ['toggleFavourite']),

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
