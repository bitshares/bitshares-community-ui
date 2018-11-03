<template>
  <div :class="{'ticker-list-row_expanded': expandMode}">
    <div
      v-if="!expandMode"
      class="tickers-list-row"
    >
      <div class="tickers-list__item">
        <div @click="$emit('change', { item })">
          <Star
            :active="isFavourite"
            class="tickers__favourite"
          />
        </div>
        <div class="tickers-list__itemPair">
          <span class="_currencyTitle">{{ item.ticker }}</span>
        </div>
        <div class="_tickerTitle tickers-list__itemVolume"> /{{ item.base }}</div>
      </div>
      <div class="tickers-list__item _alignRight">
        <div class="_currencyTitle">{{ item.price.toFixed(4) }}</div>
        <div class="_tickerTitle tickers-list__itemVolume">${{ item.usdPrice.toFixed(2) }}</div>
      </div>
      <div class="tickers-list__item _alignRight">
        <div class="tickers-list__itemVolume">{{ volUsd }}</div>
      </div>
      <div class="tickers-list__item _alignCenter">
        <div
          :class="getClassesOfDynamic({ price: item.change24h })"
          class="_currencyTitle">
          {{ changeValue24 }}
        </div>
      </div>
    </div>
    <!--expand mode-->
    <div
      v-if="expandMode"
      class="tickers-list-row"
    >
      <Star
        :active="isFavourite"
        class="tickers__favourite"
      />
      <div class="tickers-list__item _alignCenter">
        <div class="tickers-list__itemPair">
          <span class="_currencyTitle">{{ item.ticker }}</span>
          <span class="_tickerTitle"> /{{ item.base }}</span>
        </div>
      </div>
      <div class="tickers-list__item _alignRight">
        <div class="tickers-list__itemVolume">{{ volUsd }}</div>
      </div>
      <div class="tickers-list__item _alignRight">
        <div class="tickers-list__itemVolume">{{ item.priceUsd1 }}</div>
      </div>
      <div class="tickers-list__item _alignCenter">
        <div
          :class="getClassesOfDynamic({ price: item.change7d })"
          class="_currencyTitle">
          {{ changeValue7 }}
        </div>
      </div>
      <div class="tickers-list__item _alignCenter">
        <div
          :class="getClassesOfDynamic({ price: item.change24h })"
          class="_currencyTitle">
          {{ changeValue24 }}
        </div>
      </div>
      <div class="tickers-list__item">
        <div class="tickers-list__itemVolume">{{ marketCap }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Star from '@/components/Star'

export default {
  components: {
    Star
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
    float: left;
    margin-right: 1rem;
    margin-top: 0.1875rem;
  }
  .tickers-list__item {
    flex: 1;
    font-size: config('textSizes.xs-sm');
    color: config('colors.tab-header');
    font-family: config('fonts.gotham');
  }
  .tickers-list__itemVolume {
    font-size: config('textSizes.xs');
    color: config('colors.white');
    opacity: .8;
  }
  .tickers-list-row {
    display: flex;
    box-sizing: border-box;
    padding: 0.4375rem;
    padding-right: 0;
    transition: ease-in-out 0.6s ease;

    &:hover {
      cursor: pointer;
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
      .tickers__favourite {
        margin-top: -0.125rem;
        margin-right: 0.9375rem;
        position: absolute;
      }
      .tickers-list__item {
        .tickers-list__itemVolume {
          font-size: config('textSizes.xs')
        }
        ._currencyTitle {
          font-size: config('textSizes.xs')
        }
        ._drop {
          font-size: config('textSizes.sm');
        }
        ._increase {
          font-size: config('textSizes.sm');
        }
      }
    }
  }
</style>
