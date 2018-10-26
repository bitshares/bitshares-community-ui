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
        @click="changeSortField({ field: 'volUsd' })">Volume, {{ currentOfTicker }}</div>
      <div
        class="tickers-list__field _flex05"
        @click="changeSortField({ field: 'priceUsd1' })">Price, {{ currentOfTicker }}</div>
      <div
        class="tickers-list__field _flex05 _alignRight"
        @click="changeSortField({ field: 'change1' })">24h%</div>
      <div
        class="tickers-list__field _flex05 _alignRight"
        @click="changeSortField({ field: 'change2' })">7d%</div>
      <div
        class="tickers-list__field _alignRight"
        @click="changeSortField({ field: 'marketcap' })">Market Cap, {{ currentOfTicker }}</div>
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
import { mapActions } from 'vuex'
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
    favourites: {
      type: Object,
      default() {
        return () => {}
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
      sortField: 'ticker'
    }
  },
  computed: {
    sortedList() {
      if (this.currentTicker === 'favourites') {
        return this.items.filter(item => this.favourites[item.id]).sort(sortByField(this.sortField))
      }
      return this.items.slice().sort(sortByField(this.sortField))
    },
    pairTitle() {
      return `Name/Vol, ${this.currentOfTicker}`
    },
    priceTitle() {
      return `Price, ${this.currentOfTicker}`
    },
    changeTitle() {
      return '24h%/7d%'
    },
    currentOfTicker() {
      return this.currentTicker === 'favourites' ? 'USD' : this.currentTicker
    }
  },
  methods: {
    ...mapActions('markets', ['toggleFavourite']),

    changeSortField({ field }) {
      this.sortField = (this.sortField[0] === '-') ? field : `-${field}`
    },
    changeFavourite({ id }) {
      this.toggleFavourite({ id })
    }
  }
}
</script>

<style lang="scss">
  .tickers-list {
    margin-top: 0.5rem;
    font-weight: 600;

    ._alignRight {
      text-align: right;
    }
    .tickers-list-head {
      display: flex;
      box-sizing: border-box;
      padding: 0.4375rem;

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
      padding: 0.4375rem;
      transition: ease-in-out 0.6s ease;

      &:hover {
        cursor: pointer;
        background: #131313;
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
      margin-right: 0.5rem;
      margin-top: 0.3125rem;
    }
    ._ml-21 {
      margin-left: 1.3125rem;
    }
  }
  .markets--expanded {
    .tickers-list {
      .tickers__favourite {
        margin-top: -0.125rem;
        margin-right: 0.9375rem;
      }
      .pl-31 {
        box-sizing: border-box;
        padding-left: 1.9375rem;
      }
      .tickers-list-head {
        .tickers-list__field {
          font-size: config('textSizes.base')
        }
      }
    }
  }
</style>
