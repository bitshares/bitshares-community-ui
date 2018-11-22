<template>
  <div
    :class="{
      'order-tabs--buy': activeTitle === 'buy',
      'order-tabs--sell': activeTitle === 'sell'
    }"
    class="order-tabs"
  >
    <div
      :class="{'_inactive': activeTitle === 'sell'}"
      class="order-tabs-item _buy"
      @click="activeTab.title = 'buy'"
    >
      <div class="order-tabs-title">{{ buyTitle }}</div>
      <div class="order-tabs-subtitle">{{ tradeData.buy.price }}</div>
    </div>
    <div
      :class="{'_inactive': activeTitle === 'buy'}"
      class="order-tabs-item _sell"
      @click="activeTab.title = 'sell'"
    >
      <div class="order-tabs-title">{{ sellTitle }}</div>
      <div class="order-tabs-subtitle">{{ tradeData.sell.price }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    activeTab: {
      type: Object,
      default() {
        return {
          title: 'buy'
        }
      }
    },
    currentBase: {
      type: String,
      default: 'USD'
    },
    tradeData: {
      type: Object,
      default() {
        return {}
      }
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
    },
    activeTitle() {
      return this.activeTab.title
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

      .order-tabs-title {
        height: 65px;
        margin-top: -7px;
      }
      .order-tabs-subtitle {
        font-size: config('textSizes.sm');
        margin-top: -45px;
      }
    }

    &--buy {
      .order-tabs-item {
        &:not(._inactive) {
          border-top: 5px solid #79c60f;
        }
      }
    }
    &--sell {
      .order-tabs-item {
        &:not(._inactive) {
          border-top: 5px solid rgba(255, 47, 47, 0.5);
        }
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
