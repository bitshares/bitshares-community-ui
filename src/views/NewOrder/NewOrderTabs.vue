<template>
  <div
    :class="{
      'order-tabs--buy': activeTab === 'buy',
      'order-tabs--sell': activeTab === 'sell'
    }"
    class="order-tabs"
  >
    <div
      :class="{'_inactive': activeTab === 'sell'}"
      class="order-tabs-item _buy"
    >
      <div class="order-tabs-title">{{ buyTitle }}</div>
    </div>
    <div
      :class="{'_inactive': activeTab === 'buy'}"
      class="order-tabs-item _sell"
    >
      <div class="order-tabs-title">{{ sellTitle }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    activeTab: {
      type: String,
      default: 'buy'
    },
    currentBase: {
      type: String,
      default: 'USD'
    }
  },
  data() {
    return {}
  },
  computed: {
    buyTitle() {
      return `BUY ${this.currentBase}/USD`
    },
    sellTitle() {
      return `SELL ${this.currentBase}/USD`
    }
  }
}
</script>
<style lang="scss">
  .order-tabs {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    .order-tabs-item {
      box-sizing: border-box;
      width: 50%;
      height: 57px;
      line-height: 57px;
      text-align: center;
      font-weight: config('fontWeights.extrabold');
      font-size: config('textSizes.lg');
      cursor: pointer;

      &:not(._inactive) {
        border-top: 5px solid #79c60f;
      }
    }
    ._buy {
      color: #79c60f;
    }
    ._sell {
      color: rgba(255, 47, 47, 0.5);
    }
    ._inactive {
      background: #212121;
    }
  }
</style>
