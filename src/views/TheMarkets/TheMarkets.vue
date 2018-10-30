<template>
  <div
    :class="{'markets_expanded': expandMode}"
    class="markets"
  >
    <div class="markets__header">
      <div class="tickers-sidebar">
        <Tabs
          :tabs="['USD', 'BTC', 'ETH', 'CNY', 'BTS']"
          :currency-mode="true"
          @change="onTickerChange"
        />
      </div>
      <div class="search-wrapper">
        <div class="tickers-search">
          <SearchInput
            :hint="'Search'"
            v-model="searchValue"
          />
        </div>
      </div>
    </div>
    <MarketsTickersList
      :items="foundItems"
      :expand-mode="expandMode"
      :current-ticker="currentTicker"
      :favourites="favourites"
    />
  </div>
</template>
<script>
import orderBy from 'lodash/orderBy'
import Tabs from '@/components/Tabs'
import SearchInput from '@/components/SearchInput/'
import TheMarkets from '@/views/TheMarkets'
import MarketsTickersList from './MarketsTickersList'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheMarkets',
  components: {
    Tabs,
    SearchInput,
    MarketsTickersList,
    TheMarkets
  },
  props: {
    expandMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters({
      currentTicker: 'markets/getCurrentTicker',
      markets: 'markets/getMarketsList',
      favourites: 'markets/getFavouritesList'
    }),

    tickerItems() {
      if (this.currentTicker === 'favourites') {
        let allTickers = []
        const favourites = []

        Object.keys(this.markets).forEach((ticker) => {
          allTickers = allTickers.concat(this.markets[ticker])
        })
        Object.keys(this.favourites).forEach((tickerId) => {
          if (!this.favourites[tickerId]) return
          allTickers.forEach((ticker) => {
            if (ticker.id === tickerId) {
              favourites.push(ticker)
            }
          })
        })

        return orderBy(favourites, 'ticker', 'asc')
      }
      return orderBy(this.markets[this.currentTicker], 'ticker', 'asc')
    },
    foundItems() {
      if (!this.searchValue) return this.tickerItems
      return this.tickerItems.filter(item => item.ticker.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1)
    }
  },
  methods: {
    ...mapActions('markets', ['setCurrentTicker']),

    onTickerChange({ ticker }) {
      this.setCurrentTicker({ ticker })
    }
  }
}
</script>
<style lang="scss" scoped>
  .markets__header {
    margin-top: 0.625rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #0A0A0A;

    .search-wrapper {
      margin-left: -5.9375rem;
    }
    .tickers-search {
      display: flex;
      justify-content: flex-end;
      margin-top: -1.375rem;
      background: config('colors.bg-base');
    }
  }
  .markets_expanded {
    .markets__header {
      .tickers-search {
        margin-top: 0.5rem;
        left: initial;
        right: 0.625rem;
        position: relative;
        background: transparent;
        z-index: 10;
        width: auto;
      }
    }
  }
</style>
