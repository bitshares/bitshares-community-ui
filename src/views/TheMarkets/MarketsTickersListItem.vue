<template>
  <div>
    <div
      v-if="!expandMode"
      class="tickers-list-row"
    >
      <div class="tickers-list__item">
        <Star
          class="tickers__favourite"
        />
        <div class="tickers-list__itemPair">
          <span class="_currencyTitle">{{ item.ticker }}</span>
          <span class="_tickerTitle"> /{{ currentTicker }}</span>
        </div>
        <div class="tickers-list__itemVolume _ml-21">{{ volUsd }}</div>
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
    <!--expand-->
    <div
      v-if="expandMode"
      class="tickers-list-row"
    >
      <Star
        class="tickers__favourite"
      />
      <div class="tickers-list__item">
        <div class="tickers-list__itemPair">
          <span class="_currencyTitle">{{ item.ticker }}</span>
          <span class="_tickerTitle"> /{{ currentTicker }}</span>
        </div>
      </div>
      <div class="tickers-list__item">
        <div class="tickers-list__itemVolume">{{ volUsd }}</div>
      </div>
      <div class="tickers-list__item _flex05">
        <div class="tickers-list__itemVolume">{{ item.priceUsd1 }}</div>
      </div>
      <div class="tickers-list__item _flex05 _alignRight">
        <div
          :class="getClassesOfDynamic({ price: item.change1 })"
          class="_currencyTitle">
          {{ changeValue1 }}
        </div>
      </div>
      <div class="tickers-list__item _flex05 _alignRight">
        <div
          :class="getClassesOfDynamic({ price: item.change2 })"
          class="_currencyTitle">
          {{ changeValue2 }}
        </div>
      </div>
      <div class="tickers-list__item _alignRight">
        <div class="tickers-list__itemVolume">{{ marketCap }}</div>
      </div>
    </div>
  </div>
</template>
<script>

import Star from '@/components/Star'
import { getVolumeFormat } from '@/helpers/utils'

export default {
  components: {
    Star
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
    marketCap() {
      return this.getVolumeFormat(this.item.marketcap)
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
