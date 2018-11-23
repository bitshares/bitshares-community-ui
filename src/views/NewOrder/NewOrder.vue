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
      class="order-btn"
      width="full"
      v-html="operationTitle"
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
      const getTemplate = (type) => `<span class='operation-title'>${type}</span>`

      if (this.activeTab.title === 'buy') {
        return `${getTemplate('buy')} ${this.tradeData.buy.value} ${this.currentBase}`
      }
      return `${getTemplate('sell')} ${this.tradeData.sell.value} ${this.currentBase}`
    }
  }
}
</script>
<style lang="scss">
  .new-order {
    position: relative;
    height: 100%;
    .order-btn {
      width: 96%;
      position: absolute;
      left: 2%;
      bottom: 0.625rem;

      &--buy {
        background: #79c60f;
      }
      &--sell {
        background: #ed1c24;
      }
      .operation-title {
        font-weight: 600;
        display: inline-block;
        margin-right: 0.225rem
      }
    }
  }
</style>
