<template>
  <div class="tickers-list-row">
    <div class="tickers-list__item">
      <div class="tickers-list__itemPair">
        <span class="_currencyTitle">{{ item.ticker }}</span>
        <span class="_tickerTitle"> /{{ currentTicker }}</span>
      </div>
      <div class="tickers-list__itemVolume">{{ volUsd }}</div>
    </div>
    <div class="tickers-list__item _flex05">
      <div class="_currencyTitle">{{ item.priceUsd1 }}</div>
      <div class="tickers-list__itemVolume">${{ item.priceUsd2 }}</div>
    </div>
    <div class="tickers-list__item _alignRight">
      <div
        :class="getClassesOfDynamic({ price: item.change1 })"
        class="_currencyTitle">
        {{ changeValue1 }}
      </div>
      <div
        :class="getClassesOfDynamic({ price: item.change2 })"
        class="tickers-list__itemVolume">
        {{ changeValue2 }}
      </div>
    </div>
  </div>
</template>
<script>
import { getVolumeFormat } from '@/helpers/utils'

export default {
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
    }
  },
  data() {
    return {
      getVolumeFormat
    }
  },
  computed: {
    volUsd() {
      return this.getVolumeFormat(this.item.volUsd)
    },
    changeValue1() {
      return this.getChangeValue({ price: this.item.change1 })
    },
    changeValue2() {
      return this.getChangeValue({ price: this.item.change2 })
    }
  },
  methods: {
    getChangeValue({ price }) {
      const chr = '%'
      return (+price >= 0) ? `+${price}${chr}` : `${price}${chr}`
    },
    getClassesOfDynamic({ price }) {
      return {
        _increase: price >= 0,
        _drop: price < 0
      }
    }
  }
}
</script>
