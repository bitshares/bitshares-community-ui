<template>
  <div class="new-order">
    <NewOrderTabs
      :base="base"
      :quote="quote"
      :type="type"
      :buy-price="marketBuyPrice"
      :sell-price="marketSellPrice"
      @change="setType"
    />
    <Tabs
      :tabs="['MARKET', 'LIMIT']"
      :active="activeIndication"
      @change="setActiveIndication"
    />
    <NewOrderPercentSelector
      :percent-items="percentItems"
      :active-percent="activePercent"
      @change="setActivePercent"
    />
    <NewOrderInput
      title="Spend"
      placeholder="BTC"
      note="max 0.04"
      aside="left"
    />
    <NewOrderInput
      title="Get"
      placeholder="USD"
      note="max 437"
      aside="right"
    />
    <div class="new-order-button">
      <Btn
        :type="type"
        :text="buttonTitle"
        width="full"
      >
        <span class="operation-title">{{ type }}</span>
      </Btn>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import NewOrderTabs from './NewOrderTabs'
import NewOrderPercentSelector from './NewOrderPercentSelector'
import NewOrderInput from './NewOrderInput'
import Btn from '@/components/Button/Button'
import Tabs from '@/components/Tabs/Tabs'

export default {
  components: {
    NewOrderTabs,
    NewOrderPercentSelector,
    NewOrderInput,
    Btn,
    Tabs
  },
  computed: {
    ...mapGetters({
      base: 'newOrder/getBase',
      quote: 'newOrder/getQuote',
      orderAmount: 'newOrder/getOrderAmount',
      marketBuyPrice: 'newOrder/getMarketBuyPrice',
      marketSellPrice: 'newOrder/getMarketSellPrice',
      type: 'newOrder/getType',
      activeIndication: 'newOrder/getActiveIndication',
      percentItems: 'newOrder/getPercentItems',
      activePercent: 'newOrder/getActivePercent'
    }),

    buttonTitle() {
      return `${this.orderAmount} ${this.base}`
    }
  },
  methods: {
    ...mapActions({
      setActiveIndication: 'newOrder/setActiveIndication',
      setType: 'newOrder/setType',
      setActivePercent: 'newOrder/setActivePercent'
    })
  }
}
</script>
<style lang="scss">
  .new-order {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;

    .operation-title {
      font-weight: 600;
      display: inline-block;
      margin-right: 0.225rem
    }
    .new-order-button {
      margin-top: auto;
      padding: 0.5rem;
    }
  }
</style>
