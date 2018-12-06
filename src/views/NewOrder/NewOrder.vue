<template>
  <div class="new-order">
    <NewOrderTabs
      :base="base"
      :quote="quote"
      :type="type"
      :buy-price="marketPrices.buy.price"
      :sell-price="marketPrices.sell.price"
      @change="setType"
    />
    <!-- <Tabs
      :tabs="['MARKET', 'LIMIT']"
      :active="activeIndication"
      @change="setActiveIndication"
    /> -->
    <div class="new-order-fields">
      <NewOrderInput
        :placeholder="quote"
        :value="spendAmount"
        title="Spend"
        note="max 0.04"
        @change="setSpendAmount"
      />
      <NewOrderInput
        :placeholder="base"
        :value="getAmount"
        title="Get"
        note="max 437"
        @change="setGetAmount"
      />
    </div>
    <div class="new-order-price">
      <NewOrderInput
        :title="priceTitle"
        :value="price"
        placeholder="PRICE"
        @change="setPrice"
      />
    </div>
    <div
      class="new-order-button"
      @click="showConfirmOrder(true)"
    >
      <Btn
        :type="type"
        :text="buttonTitle"
        width="full"
      >
        <span class="operation-title">{{ type }}</span>
      </Btn>
    </div>
    <!-- CONFIRM ORDER -->
    <Modal
      v-if="confirmVisible"
      :width-auto="true"
      @close="showConfirmOrder"
    >
      <ConfirmOrder
        :base="base"
        :quote="quote"
        :type="type"
        :price="price"
        :get="getAmount"
        :spend="spendAmount"
        :trading-fee="15.82"
        :exchange-fee="10.23"
        @close="showConfirmOrder"
      />
    </Modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import NewOrderTabs from './NewOrderTabs'
import NewOrderInput from './NewOrderInput'
import Btn from '@/components/Button/Button'
import Tabs from '@/components/Tabs/Tabs'
import ConfirmOrder from '@/views/ConfirmOrder/ConfirmOrder'
import Modal from '@/components/Modal'

export default {
  components: {
    NewOrderTabs,
    NewOrderInput,
    Btn,
    Tabs,
    ConfirmOrder,
    Modal
  },
  data() {
    return {
      confirmVisible: false
    }
  },
  computed: {
    ...mapGetters({
      base: 'newOrder/getBase',
      quote: 'newOrder/getQuote',
      type: 'newOrder/getType',
      activeIndication: 'newOrder/getActiveIndication',
      percentItems: 'newOrder/getPercentItems',
      activePercent: 'newOrder/getActivePercent',
      getAmount: 'newOrder/getGetAmount',
      spendAmount: 'newOrder/getSpendAmount',
      price: 'newOrder/getPrice',
      marketPrices: 'newOrder/getMarketPrices'
    }),

    priceTitle() {
      return `Price .${this.quote}`
    },

    buttonTitle() {
      const orderAmount = this.type === 'buy' ? this.getAmount : this.sellAmount
      return `${orderAmount} ${this.base}`
    }
  },
  methods: {
    ...mapActions({
      setActiveIndication: 'newOrder/setActiveIndication',
      setType: 'newOrder/setType',
      setActivePercent: 'newOrder/setActivePercent',
      setGetAmount: 'newOrder/setGetAmount',
      setSpendAmount: 'newOrder/setSpendAmount',
      setPrice: 'newOrder/setPrice'
    }),
    showConfirmOrder(value) {
      this.confirmVisible = value
    }
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
    .new-order-fields {
      margin-top: 3rem;
      display: flex;
      justify-content: space-between;
    }
    .new-order-price {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
    }
  }
</style>
