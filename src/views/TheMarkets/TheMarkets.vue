<template>
  <div class="markets">
    <div class="markets__header">
      <div class="ticker-sidebar">
        <Tabs
          :tabs="['USD', 'BTC', 'ETH', 'CNY', 'BTS']"
          :currency-mode="true"
        />
      </div>
      <div class="ticker-search">
        <SearchInput
          :hint="'Search'"
          :on-change="onSearch"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Tabs from '@/components/Tabs'
import SearchInput from '@/components/SearchInput/'

export default {
  components: {
    Tabs,
    SearchInput
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

    .ticker-search {
      margin-top: -20px;
      position: absolute;
      right: 10px;
      z-index: 10;
    }
  }
</style>
