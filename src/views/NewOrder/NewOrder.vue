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
    <NewOrderPercentSelector 
      :percent-items="percentItems" 
      :active-percent="activePercent"
      @change="setMaxSpend"
    />
    <div class="new-order-fields">
      <NewOrderInput
        :placeholder="spendAsset"
        :value="spendAmount"
        :note="`max ${maxSpend}`"
        :error="spendExceeded"
        :title="`Spend ${spendAsset}`"
        @change="setSpendAmount"
        @note-click="setMaxSpend"
      />
      <NewOrderInput
        :placeholder="getAsset"
        :value="getAmount"
        :title="`Get ${getAsset}`"
        :note="`max ${maxGet}`"
        @change="setGetAmount"
        @note-click="setMaxSpend"
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
    <div class="new-order-button">
      <Btn
        :type="type"
        :text="buttonTitle"
        :disabled="invalidOrder"
        width="full"
        @click="showConfirm"
      >
        <span class="operation-title">{{ type }}</span>
      </Btn>
    </div>
    <!-- CONFIRM ORDER -->

    <ConfirmModal
      :show="confirmDisplayed"
      :pending="pending"
      title="confirm order"
      @close="hideConfirm"
      @confirm="dispatchOrder"
    >
      <ConfirmOrder
        :base="base"
        :quote="quote"
        :type="type"
        :price="price || 0"
        :get="getAmount"
        :spend="spendAmount"
        :trading-fee="15.82"
        :exchange-fee="10.23"
        @close="hideConfirm"
      />
    </ConfirmModal>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import NewOrderTabs from './NewOrderTabs'
import NewOrderInput from './NewOrderInput'
import NewOrderPercentSelector from './NewOrderPercentSelector'
import Btn from '@/components/Button/Button'
import Tabs from '@/components/Tabs/Tabs'
import ConfirmOrder from '@/views/ConfirmOrder/ConfirmOrder'
import Modal from '@/components/Modal'
import ConfirmModal from '@/views/ConfirmModal/ConfirmModal.vue'
import { getFloatCurrency } from '@/helpers/utils'

export default {
  components: {
    NewOrderTabs,
    NewOrderInput,
    NewOrderPercentSelector,
    Btn,
    Tabs,
    ConfirmOrder,
    Modal,
    ConfirmModal
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
      marketPrices: 'newOrder/getMarketPrices',
      maxBase: 'newOrder/getMaxBase',
      maxQuote: 'newOrder/getMaxQuote',
      confirmDisplayed: 'newOrder/confirmDisplayed',
      pending: 'newOrder/inProgress'
    }),
    maxSpend() {
      return this.type === 'buy' ? this.maxQuote : this.maxBase
    },
    maxGet() {
      return this.price ? getFloatCurrency(this.maxSpend / this.price) : 0
    },
    spendExceeded() {
      return this.spendAmount > this.maxSpend
    },
    priceTitle() {
      return `Price .${this.quote}`
    },
    spendAsset() {
      return this.type === 'buy' ? this.quote : this.base
    },
    getAsset() {
      return this.type === 'buy' ? this.base : this.quote
    },
    buttonTitle() {
      const orderAmount = this.type === 'buy' ? this.getAmount : this.spendAmount
      const formattedAmount = getFloatCurrency(orderAmount || 0)
      return `${formattedAmount} ${this.base}`
    },
    invalidOrder() {
      return !this.spendAmount || !this.getAmount || this.spendExceeded
    },
    formattedPrice() {
      return getFloatCurrency(this.price)
    }
  },
  methods: {
    ...mapActions({
      setActiveIndication: 'newOrder/setActiveIndication',
      setType: 'newOrder/setType',
      setActivePercent: 'newOrder/setActivePercent',
      setGetAmount: 'newOrder/setGetAmount',
      setSpendAmount: 'newOrder/setSpendAmount',
      setPrice: 'newOrder/setPrice',
      setMaxSpend: 'newOrder/setMaxSpend',
      dispatchOrder: 'newOrder/dispatchOrder',
      showConfirm: 'newOrder/showConfirm',
      hideConfirm: 'newOrder/hideConfirm'
    }),
    setMaxSpend(percent = 100) {
      const amount = this.maxSpend / 100 * percent
      this.setSpendAmount(amount)
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
      margin-top: 1rem;
      padding: 0 1rem;
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
