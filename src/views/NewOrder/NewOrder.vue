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
    <Btn
      :type="type"
      :text="buttonTitle"
      width="full"
    >
      <span class="operation-title">{{ type }}</span>
    </Btn>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import NewOrderTabs from './NewOrderTabs'
import Btn from '@/components/Button/Button'
import Tabs from '@/components/Tabs/Tabs'

export default {
  components: {
    NewOrderTabs,
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
      activeIndication: 'newOrder/getActiveIndication'
    }),

    buttonTitle() {
      if (this.type === 'buy') {
        return `${this.orderAmount} ${this.base}`
      }
      return `${this.orderAmount} ${this.base}`
    }
  },
  methods: {
    ...mapActions({
      setActiveIndication: 'newOrder/setActiveIndication',
      setType: 'newOrder/setType'
    })
  }
}
</script>
<style lang="scss">
  .new-order {
    position: relative;
    height: 100%;

    .operation-title {
      font-weight: 600;
      display: inline-block;
      margin-right: 0.225rem
    }
  }
</style>
