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
      return getVolumeFormat(this.item.volUsd)
    },
    marketCap() {
      return getVolumeFormat(this.item.marketcap)
    },
    changeValue7() {
      return this.getChangeValue({ price: this.item.change1 })
    },
    changeValue24() {
      return this.getChangeValue({ price: this.item.change2 })
    }
  },
  methods: {
    ...mapActions('markets', ['toggleFavourite']),

    getChangeValue({ price }) {
      return (+price >= 0) ? `+${price}%` : `${price}%`
    },
    changeFavourite({ item }) {
      this.toggleFavourite({ base: item.base, quote: item.ticker })
    }
  }
}
</script>
