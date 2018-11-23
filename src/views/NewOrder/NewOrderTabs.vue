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
      <NewOrderTabsTitle
        :title="buyTitle"
        :sub-title="tradeData.buy.price"
        :increased="tradeData.buy.increased"
      />
    </div>
    <div
      :class="{'_inactive': activeTitle === 'buy'}"
      class="order-tabs-item _sell"
      @click="activeTab.title = 'sell'"
    >
      <NewOrderTabsTitle
        :title="sellTitle"
        :sub-title="tradeData.sell.price"
        :increased="tradeData.sell.increased"
      />
    </div>
  </div>
</template>
<script>
import NewOrderTabsTitle from './NewOrderTabsTitle'

export default {
  components: {
    NewOrderTabsTitle
  },
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
      height: 3.5625rem;
      line-height: 3.5625rem;
      text-align: center;
      font-weight: config('fontWeights.extrabold');
      font-size: config('textSizes.lg');
      cursor: pointer;
    }
    &--buy {
      .order-tabs-item {
        &:not(._inactive) {
          border-top: 0.3125rem solid #79c60f;
        }
      }
    }
    &--sell {
      .order-tabs-item {
        &:not(._inactive) {
          border-top: 0.3125rem solid rgba(255, 47, 47, 0.5);
        }
      }
    }
    ._buy {
      color: rgba(121, 198, 15, 0.5);
    }
    ._sell {
      color: rgba(255, 47, 47, 0.5);
    }
    ._inactive {
      background: #212121;
    }
  }
</style>
