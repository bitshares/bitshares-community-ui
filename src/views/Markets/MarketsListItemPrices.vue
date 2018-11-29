<template>
  <div :class="{'ticker-list-row_expanded': expandMode}">
    <div
      v-if="!expandMode"
      class="tickers-list-row"
    >
      <div class="tickers-list__item">
        <Star
          :active="isFavourite"
          class="tickers__favourite"
          @click.stop.native="$emit('change', { item })"
        />
        <TwoLineItem
          :top="item.ticker"
          :bottom="base"
          class="pl-6"
        />
      </div>
      <div class="tickers-list__item _alignRight">
        <TwoLineItem
          :top="price"
          :bottom="usdPrice"
        />
      </div>
      <div class="tickers-list__item _alignRight">
        <div class="tickers-list__itemVolume">{{ volUsd }}</div>
      </div>
      <div class="tickers-list__item _alignRight">
        <div
          :class="getClassesOfDynamic({ price: item.change24h })"
          class="tickers-list__itemVolume _currencyTitle">
          {{ changeValue24 }}
        </div>
      </div>
    </div>
    <!--expand mode-->
    <div
      v-if="expandMode"
      class="tickers-list-row"
    >
      <div class="tickers-list__item">
        <Star
          :active="isFavourite"
          class="tickers__favourite"
          @click.native="$emit('change', { item })"
        />
        <div class="tickers-list__itemPair">
          <span class="_currencyTitle pl-6">{{ item.ticker }}</span>
          <span class="_tickerTitle">/{{ item.base }}</span>
        </div>
      </div>
      <div class="tickers-list__item">
        <div class="tickers-list__itemVolume">{{ volUsd }}</div>
      </div>
      <div class="tickers-list__item">
        <div class="tickers-list__itemVolume">${{ item.usdPrice.toFixed(2) }}</div>
      </div>
      <div class="tickers-list__item _alignCenter">
        <div
          :class="getClassesOfDynamic({ price: item.change24h })"
          class="_currencyTitle">
          {{ changeValue24 }}
        </div>
      </div>
      <div class="tickers-list__item _alignCenter">
        <div
          :class="getClassesOfDynamic({ price: item.change7d })"
          class="_currencyTitle">
          {{ changeValue7 }}
        </div>
      </div>
      <!-- <div class="tickers-list__item _alignRight">
        <div class="tickers-list__itemVolume">{{ marketCap }}</div>
      </div> -->
    </div>
  </div>
</template>
<script>
import Star from '@/components/Star'
import TwoLineItem from '@/components/TwoLineItem/TwoLineItem'
import { getFloatCurrency } from '@/helpers/utils'

export default {
  components: {
    Star,
    TwoLineItem
  },
  props: {
    isFavourite: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {}
    },
    volUsd: {
      type: String,
      default: ''
    },
    changeValue7: {
      type: String,
      default: ''
    },
    changeValue24: {
      type: String,
      default: ''
    },
    marketCap: {
      type: Number,
      default: 0
    },
    expandMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    price() {
      return getFloatCurrency(this.item.price)
    },
    usdPrice() {
      return getFloatCurrency(this.item.usdPrice)
    },
    base() {
      return `/${this.item.base}`
    }
  },
  methods: {
    getClassesOfDynamic({ price }) {
      return {
        _increase: price > 0,
        _drop: price < 0
      }
    }
  }
}
</script>
<style lang="scss">
  .tickers__favourite {
    position: absolute;
    left: 0;
    top: 0.75rem;
  }
  .tickers-list__item {
    font-weight: config('fontWeights.semibold');
    flex: 1;
    font-size: config('textSizes.xs-sm');
    color: config('colors.tab-header');
    font-family: config('fonts.gotham');
    position: relative;
    overflow: hidden;
  }

  .tickers-list__itemVolume {
    font-size: config('textSizes.lg');
    color: config('colors.primary');
  }

  .tickers-list__itemPair {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .tickers-list-row {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 0.4375rem 1rem .4375rem .54rem;
    transition: background 0.2s ease;
    cursor: pointer;

    &:hover {
      position: relative;
      z-index: 2;
      background: #131313;
    }
    ._alignRight {
      text-align: right;
    }
    ._alignCenter {
      text-align: center;
    }
    ._tickerTitle {
      font-size: config('textSizes.xs');
      color: config('colors.inactive');
    }
    ._currencyTitle {
      color: config('colors.white');
      overflow: hidden;
      text-overflow: ellipsis;
    }
    ._increase {
      color: config('colors.increase');
      opacity: 1;
    }
    ._drop {
      color: config('colors.drop');
      opacity: 1;
    }
    ._flex05 {
      flex: .7;
    }
  }
  .ticker-list-row_expanded {
    .tickers-list-row {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      .tickers-list__item {
        .tickers-list__itemPair {
          padding-right: .3rem;
        }
        .tickers__favourite {
          position: absolute;
          left: 0;
          top: -1px;
        }
        .tickers-list__itemVolume {
          font-size: config('textSizes.xl')
        }
        ._currencyTitle {
          font-size: config('textSizes.xl')
        }
        ._drop {
          font-size: config('textSizes.xl');
        }
        ._increase {
          font-size: config('textSizes.xl');
        }
      }
    }
  }
</style>
