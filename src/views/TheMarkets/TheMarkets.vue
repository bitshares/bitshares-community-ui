<template>
  <div
    :class="{'markets--expanded': expandMode}"
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
      <div class="tickers-search">
        <SearchInput
          :hint="'Search'"
          @change="onSearch"
        />
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
import { sortByField } from '@/helpers/utils'
import Tabs from '@/components/Tabs'
import SearchInput from '@/components/SearchInput/'
import TheMarkets from '@/views/TheMarkets'
import MarketsTickersList from './MarketsTickersList'

import { mapGetters } from 'vuex'

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
      currentTicker: 'USD',
      searchValue: '',
      showModal: false
    }
  },
  computed: {
    ...mapGetters({
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
            if (ticker.id === +tickerId) {
              favourites.push(ticker)
            }
          })
        })
        return favourites.sort(sortByField('ticker'))
      }
      return this.markets[this.currentTicker].slice().sort(sortByField('ticker'))
    },
    foundItems() {
      if (!this.searchValue) return this.tickerItems
      return this.tickerItems.filter(item => item.ticker.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1)
    }
  },
  methods: {
    onSearch({ value }) {
      this.searchValue = value
    },
    onTickerChange(tickerValue) {
      this.currentTicker = tickerValue
    }
  }
}
</script>
<style lang="scss" scoped>
  .markets__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #0A0A0A;
    .tickers-search {
      margin-top: -22px;
      position: absolute;
      left: 212px;
      z-index: 10;
    }
  }
  .markets--expanded {
    .markets__header {
      .tickers-search {
        margin-top: 8px;
        left: initial;
        right: 10px;
      }
    }
  }
</style>
