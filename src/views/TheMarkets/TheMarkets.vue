<template>
  <div class="markets">
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
          :on-change="onSearch"
        />
      </div>
    </div>
    <MarketsTickersList
      :items="foundItems"
      :current-ticker="currentTicker"
    />
  </div>
</template>
<script>
import Tabs from '@/components/Tabs'
import SearchInput from '@/components/SearchInput/'
import MarketsTickersList from './MarketsTickersList'

import { mapGetters } from 'vuex'

export default {
  components: {
    Tabs,
    SearchInput,
    MarketsTickersList
  },
  data() {
    return {
      currentTicker: 'USD',
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters('markets', ['markets']),

    tickerItems() {
      return this.markets[this.currentTicker] ? this.markets[this.currentTicker] : []
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

    .tickers-search {
      margin-top: -20px;
      position: absolute;
      right: 10px;
      z-index: 10;
    }
  }
</style>
