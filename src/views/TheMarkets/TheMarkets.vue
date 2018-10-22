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
        <input type="text" placeholder="Search">
      </div>
    </div>
  </div>
</template>
<script>
import Tabs from '@/components/Tabs'
import SearchInput from '@/components/Input/'

export default {
  components: {
    Tabs,
    SearchInput
  },
  data() {
    return {
      searchValue: '',
      searchErrors: {}
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
      input {
        border: none;
        outline: none;
        background: config('colors.card-background');
        color: config('colors.white');
        border-bottom: 1px solid #7a7675;
      }
    }
  }
</style>
