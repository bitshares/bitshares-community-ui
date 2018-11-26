<template>
  <div class="new-order">
    <NewOrderTabs
      :current-base="currentBase"
      :active-tab="activeTab"
      :buy-price="marketBuyPrice"
      :sell-price="marketSellPrice"
    />
    <Tabs
      :tabs="['MARKET', 'LIMIT']"
      :active="activeIndication"
      @change="setActiveIndication"
    />
    <NewOrderPercents
      :percents="percents"
    />
    <NewOrderPrice
      :current-base="currentBase"
      order-type="buy"
      class="float-left"
    />
    <NewOrderPrice
      :current-base="currentBase"
      order-type="sell"
      class="float-right"
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
import { mapGetters, mapActions } from 'vuex'
import NewOrderTabs from './NewOrderTabs'
import NewOrderPrice from './NewOrderPrice'
import NewOrderPercents from './NewOrderPercents'
import Btn from '@/components/Button/Button'
import Tabs from '@/components/Tabs/Tabs'

export default {
  components: {
    NewOrderTabs,
    NewOrderPrice,
    NewOrderPercents,
    Btn,
    Tabs
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
      percents: 'newOrder/getPercents',
      activeIndication: 'newOrder/getActiveIndication'
    }),

    buttonTitle() {
      if (this.activeTab === 'buy') {
        return `${this.marketBuyPrice} ${this.currentBase}`
      }
      return `${this.marketSellPrice} ${this.currentBase}`
    }
  },
  methods: {
    ...mapActions({
      setActiveIndication: 'newOrder/setActiveIndication'
    })
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
