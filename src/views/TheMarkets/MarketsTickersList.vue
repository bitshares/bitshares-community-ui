<template>
  <div class="tickers-list">
    <div class="tickers-list-head">
      <div
        class="tickers-list__field"
        @click="changeSortField({ field: 'ticker' })"
      >{{ pairTitle }}</div>
      <div
        class="tickers-list__field _flex05"
        @click="changeSortField({ field: 'priceUsd1' })"
        >{{ priceTitle }}</div>
      <div
        class="tickers-list__field _alignRight"
        @click="changeSortField({ field: 'change1' })"
      >{{ changeTitle }}</div>
    </div>
    <MarketsTickersListItem
      v-for="(ticker, index) in markets"
      :key="index"
      :item="ticker"
      :current-ticker="currentTicker"
    />
  </div>
</template>

<script>
import { sortByField } from '@/helpers/utils'
import MarketsTickersListItem from './MarketsTickersListItem'

export default {
  components: {
    MarketsTickersListItem
  },
  props: {
    currentTicker: {
      type: String,
      default: 'USD'
    },
    items: {
      type: Array,
      default() {
        return () => []
      }
    }
  },
  data() {
    return {
      sortField: 'ticker'
    }
  },
  computed: {
    markets() {
      return this.items.slice().sort(sortByField(this.sortField))
    },
    pairTitle() {
      return `Name/Vol, ${this.currentTicker}`
    },
    priceTitle() {
      return `Price, ${this.currentTicker}`
    },
    changeTitle() {
      return '24h%/7d%'
    }
  },
  methods: {
    changeSortField({ field }) {
      this.sortField = field
    }
  }
}
</script>

<style lang="scss">
  .tickers-list {
    margin-top: 8px;
    font-weight: 600;

    ._alignRight {
      text-align: right;
    }
    .tickers-list-head {
      display: flex;
      box-sizing: border-box;
      padding: 7px;

      .tickers-list__field {
        font-size: 13px;
        flex: 1;
        text-transform: none;
        color: config('colors.tab-header');
        font-family: config('fonts.gotham');

        &:hover {
          cursor: pointer;
        }
      }
      ._flex05 {
        flex: .6;
      }
    }
    .tickers-list-row {
      display: flex;
      box-sizing: border-box;
      padding: 7px;
      transition: all 0.6s ease;

      &:hover {
        cursor: pointer;
        background: #131313;
      }

      .tickers-list__item {
        flex: 1;
        font-size: 13px;
        text-transform: none;
        color: config('colors.tab-header');
        font-family: config('fonts.gotham');
      }
      .tickers-list__itemVolume {
        font-size: 12px;
        color: config('colors.white');
        opacity: .8;
      }
      ._tickerTitle {
        font-size: 12px;
      }
      ._currencyTitle {
        color: config('colors.white');
        font-size: 14px;
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
        flex: .6;
      }
    }
  }
</style>
