<template>
  <div class="new-order">
    <NewOrderTabs
      :current-base="currentBase"
      :active-tab="activeTab"
      :trade-data="tradeData"

    />
    <NewOrderPrice
      :trade-item="tradeData.buy"
      order-type="buy"
    />
    <NewOrderPrice
      :trade-item="tradeData.sell"
      order-type="sell"
    />
    <Btn
      :class="{
        'order-btn--buy': tabType === 'buy',
        'order-btn--sell': tabType === 'sell'
      }"
      :text="operationTitle"
      class="order-btn"
      width="full"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NewOrderTabs from './NewOrderTabs'
import NewOrderPrice from './NewOrderPrice'
import Btn from '@/components/Button/Button'

export default {
  components: {
    NewOrderTabs,
    NewOrderPrice,
    Btn
  },
  data() {
    return {
      activeTab: {
        title: 'buy'
      }
    }
  },
  computed: {
    ...mapGetters({
      currentBase: 'newOrder/getCurrentBase',
      tradeData: 'newOrder/getTradeData'
    }),

    tabType() {
      return this.activeTab.title
    },
    operationTitle() {
      if (this.activeTab.title === 'buy') {
        return `Buy ${this.tradeData.buy.value} ${this.currentBase}`
      }
      return `Sell ${this.tradeData.sell.value} ${this.currentBase}`
    }
  }
}
</script>
<style lang="scss">
  .new-order {
    position: relative;
    height: 352px;

    .order-btn {
      position: absolute;
      bottom: 0;
      &--buy {
        background: #79c60f;
      }
      &--sell {
        background: #ed1c24;
      }
    }
  }
</style>
