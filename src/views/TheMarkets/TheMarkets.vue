<template>
  <div class="markets">
    <div class="markets__header">
      <div class="tickers-sidebar">
        <Tabs
          :tabs="['USD', 'BTC', 'ETH', 'CNY', 'BTS']"
          :currency-mode="true"
        />
      </div>
      <div class="tickers-search">
        <SearchInput
          :hint="'Search'"
          :on-change="onSearch"
        />
      </div>
    </div>
    <MarketsTickersList/>
  </div>
</template>
<script>
import Tabs from '@/components/Tabs'
import SearchInput from '@/components/SearchInput/'
import MarketsTickersList from './MarketsTickersList'

export default {
  components: {
    Tabs,
    SearchInput,
    MarketsTickersList
  },
  methods: {
    onSearch({ value }) {
      console.info(value)
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
