<template>
  <div class="tickers-list-row">
    <div class="tickers-list__item">
      <div class="tickers-list__itemPair">
        <span class="_currencyTitle">ZIL</span>
        <span class="_tickerTitle"> /{{ currentTicker }}</span>
      </div>
      <div class="tickers-list__itemVolume">10 764 160</div>
    </div>
    <div class="tickers-list__item _flex05">
      <div class="_currencyTitle">0.034810</div>
      <div class="tickers-list__itemVolume">$0.04</div>
    </div>
    <div class="tickers-list__item _alignRight">
      <div class="_currencyTitle _increase">+37.77%</div>
      <div class="tickers-list__itemVolume _increase">+12%</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    currentTicker: {
      type: String,
      default: 'USD'
    }
  }
}
</script>
