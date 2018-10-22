<template>
  <div class="tickers-list">
    <div class="tickers-list-head">
      <div class="tickers-list__field">{{ pairTitle }}</div>
      <div class="tickers-list__field _flex05">{{ priceTitle }}</div>
      <div class="tickers-list__field _alignRight">{{ changeTitle }}</div>
    </div>
    <!--test row increase-->
    <div class="tickers-list-row">
      <div class="tickers-list__item">
        <div class="tickers-list__itemPair">
          <span class="_currencyTitle">ZIL</span>
          <span class="_tickerTitle"> /{{currentTicker}}</span>
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
    <!--test row drop-->
    <div class="tickers-list-row">
      <div class="tickers-list__item">
        <div class="tickers-list__itemPair">
          <span class="_currencyTitle">ZCN</span>
          <span class="_tickerTitle"> /{{currentTicker}}</span>
        </div>
        <div class="tickers-list__itemVolume">934 230</div>
      </div>
      <div class="tickers-list__item _flex05">
        <div class="_currencyTitle">9.29</div>
        <div class="tickers-list__itemVolume">$0.03</div>
      </div>
      <div class="tickers-list__item _alignRight">
        <div class="_currencyTitle _drop">-0.12%</div>
        <div class="tickers-list__itemVolume _drop">-17%</div>
      </div>
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
    font-weight: 600;

    ._alignRight {
      text-align: right;
    }
    .tickers-list-head {
      display: flex;

      .tickers-list__field {
        font-size: 13px;
        flex: 1;
        text-transform: none;
        color: config('colors.tab-header');
        font-family: config('fonts.gotham');
      }
      ._flex05 {
        flex: .6;
      }
    }
    .tickers-list-row {
      margin-top: 12px;
      display: flex;

      .tickers-list__item {
        flex: 1;
        font-size: 13px;
        text-transform: none;
        color: config('colors.tab-header');
        font-family: config('fonts.gotham');
      }
      .tickers-list__itemVolume {
        font-size: 12px;
        color: config('colors.white');
        opacity: .8;
      }
      ._tickerTitle {
        font-size: 12px;
      }
      ._currencyTitle {
        color: config('colors.white');
        font-size: 14px;
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
  }
</style>
