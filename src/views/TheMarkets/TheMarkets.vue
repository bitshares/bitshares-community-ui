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
      :items="tickerItems"
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
      currentTicker: 'USD'
    }
  },
  computed: {
    ...mapGetters('markets', ['markets']),

    tickerItems() {
      return this.markets[this.currentTicker] ? this.markets[this.currentTicker] : []
    }
  },
  methods: {
    onSearch({ value }) {
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
