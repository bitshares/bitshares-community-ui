<template>
  <div class="new-order">
    <NewOrderTabs
      :current-base="currentBase"
      :active-tab="activeTab"
      :buy-price="marketBuyPrice"
      :sell-price="marketSellPrice"
    />
    <NewOrderPercents
      :percents="percents"
    />
    <NewOrderPrice
      :current-base="currentBase"
      order-type="buy"
    />
    <NewOrderPrice
      :current-base="currentBase"
      order-type="sell"
    />
    <Btn
      :class="{
        'order-btn--buy': activeTab === 'buy',
        'order-btn--sell': activeTab === 'sell'
      }"
      :text="buttonTitle"
      class="order-btn"
      width="full"
    >
      <span class="operation-title">{{ activeTab }}</span>
    </Btn>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NewOrderTabs from './NewOrderTabs'
import NewOrderPrice from './NewOrderPrice'
import NewOrderPercents from './NewOrderPercents'
import Btn from '@/components/Button/Button'

export default {
  components: {
    NewOrderTabs,
    NewOrderPrice,
    NewOrderPercents,
    Btn
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      currentBase: 'newOrder/getCurrentBase',
      marketBuyPrice: 'newOrder/getMarketBuyPrice',
      marketSellPrice: 'newOrder/getMarketSellPrice',
      activeTab: 'newOrder/getActiveTab',
      percents: 'newOrder/getPercents'
    }),

    buttonTitle() {
      if (this.activeTab === 'buy') {
        return `${this.marketBuyPrice} ${this.currentBase}`
      }
      return `${this.marketSellPrice} ${this.currentBase}`
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
