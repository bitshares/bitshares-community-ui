<template>
  <div class="tickers-list">
    <div class="tickers-list-head">
      <div class="tickers-list__item">{{ pairTitle }}</div>
      <div class="tickers-list__item">{{ priceTitle }}</div>
      <div class="tickers-list__item">{{ changeTitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTicker: {
      type: String,
      default: 'USD'
    }
  },
  computed: {
    pairTitle() {
      return `Name/Vol, ${this.currentTicker}`
    },
    priceTitle() {
      return `Price, ${this.currentTicker}`
    },
    changeTitle() {
      return '24h%/7d%'
    }
  }
}
</script>

<style lang="scss">
  .tickers-list {
    margin-top: 15px;
  }

  .tickers-list-head {
    display: flex;

    .tickers-list__item {
      flex: 1;
      font-size: 13px;
      text-transform: none;
      color: config('colors.tab-header');
      font-family: config('fonts.gotham');
    }
  }
</style>
