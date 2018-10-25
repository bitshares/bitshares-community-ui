<template>
  <div class="tickers-list">
    <!--small-->
    <div
      v-if="!expandMode"
      class="tickers-list-head"
    >
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
    <!--expand-->
    <div
      v-if="expandMode"
      class="tickers-list-head"
    >
      <div
        class="tickers-list__field pl-31"
        @click="changeSortField({ field: 'ticker' })">Name</div>
      <div
        class="tickers-list__field"
        @click="changeSortField({ field: 'volUsd' })">Volume, {{ currentTicker }}</div>
      <div
        class="tickers-list__field _flex05"
        @click="changeSortField({ field: 'priceUsd1' })">Price, {{ currentTicker }}</div>
      <div
        class="tickers-list__field _flex05 _alignRight"
        @click="changeSortField({ field: 'change1' })">24h%</div>
      <div
        class="tickers-list__field _flex05 _alignRight"
        @click="changeSortField({ field: 'change2' })">7d%</div>
      <div
        class="tickers-list__field _alignRight"
        @click="changeSortField({ field: 'marketcap' })">Market Cap, {{ currentTicker }}</div>
    </div>
    <MarketsTickersListItem
      v-for="(ticker, index) in sortedList"
      :key="index"
      :item="ticker"
      :current-ticker="currentTicker"
      :expand-mode="expandMode"
      :on-change-favourite="changeFavourite"
      :is-favourite="!!favourites[ticker.id]"
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
      sortField: 'ticker',
      favourites: JSON.parse(localStorage.getItem('favourites')) || {}
    }
  },
  computed: {
    sortedList() {
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
      this.sortField = (this.sortField[0] === '-') ? field : `-${field}`
    },
    changeFavourite({ id }) {
      this.favourites[id] ? this.favourites[id] = false : this.favourites[id] = true

      localStorage.setItem('favourites', JSON.stringify(Object.assign({}, this.favourites)))
      this.favourites = JSON.parse(localStorage.getItem('favourites')) || {}
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
        font-size: config('textSizes.xs-sm');
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
        font-size: config('textSizes.xs-sm');
        text-transform: none;
        color: config('colors.tab-header');
        font-family: config('fonts.gotham');
      }
      .tickers-list__itemVolume {
        font-size: config('textSizes.xs');
        color: config('colors.white');
        opacity: .8;
      }
      ._tickerTitle {
        font-size: config('textSizes.xs');
      }
      ._currencyTitle {
        color: config('colors.white');
        font-size: config('textSizes.sm');
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
    .tickers__favourite {
      display: inline-block;
      float: left;
      margin-right: 8px;
      margin-top: 5px;
    }
    ._ml-21 {
      margin-left: 21px;
    }
  }
  .markets--expanded {
    .tickers-list {
      .tickers__favourite {
        margin-top: -2px;
        margin-right: 15px;
      }
      .pl-31 {
        box-sizing: border-box;
        padding-left: 31px;
      }
      .tickers-list-head {
        .tickers-list__field {
          font-size: config('textSizes.base')
        }
      }
      .tickers-list-row {
        .tickers-list__item {
          .tickers-list__itemVolume {
            font-size: config('textSizes.base')
          }
          ._currencyTitle {
            font-size: config('textSizes.base')
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
  }
</style>
