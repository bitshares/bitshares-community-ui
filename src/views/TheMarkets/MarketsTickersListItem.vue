<template>
  <div @click="$emit('change', { item })">
    <MarketsTickersListItemPrices
      :item="item"
      :current-ticker="currentTicker"
      :change-value7="changeValue7"
      :change-value24="changeValue24"
      :vol-usd="volUsd"
      :is-favourite="isFavourite"
      :market-cap="marketCap"
      :expand-mode="expandMode"
    />
  </div>
</template>
<script>

import Star from '@/components/Star'
import MarketsTickersListItemPrices from './MarketsTickersListItemPrices'
import { getVolumeFormat } from '@/helpers/utils'

export default {
  components: {
    Star,
    MarketsTickersListItemPrices
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    currentTicker: {
      type: String,
      default: 'USD'
    },
    expandMode: {
      type: Boolean,
      default() {
        return false
      }
    },
    isFavourite: {
      type: Boolean,
      default() {
        return false
      }
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
    getChangeValue({ price }) {
      const chr = '%'
      return (+price >= 0) ? `+${price}${chr}` : `${price}${chr}`
    }
  }
}
</script>
