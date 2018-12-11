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
    <Tabs
      :tabs="['MARKET', 'LIMIT']"
      :active="'LIMIT'"
      @change="setActiveIndication"
    />
    <NewOrderPercentSelector
      :percent-items="percentItems"
      :active-percent="activePercent"
      @change="setMaxSpend"
    />
    <div class="new-order-fields">
      <NewOrderInput
        :placeholder="quote"
        :value="quoteAmount"
        :note="`max ${maxQuoteTitle}`"
        :error="spendExceeded"
        :title="quoteInputTitle"
        @change="setQuoteAmount"
        @note-click="setMaxSpend"
      />
      <NewOrderInput
        :placeholder="base"
        :value="baseAmount"
        :title="baseInputTitle"
        :error="spendExceeded"
        :note="`max ${maxBaseTitle}`"
        @change="setBaseAmount"
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
        :price="price"
        :base-amount="baseAmount"
        :quote-amount="quoteAmount"
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
      baseAmount: 'newOrder/getBaseAmount',
      quoteAmount: 'newOrder/getQuoteAmount',
      price: 'newOrder/getPrice',
      marketPrices: 'newOrder/getMarketPrices',
      maxBase: 'newOrder/getMaxBase',
      maxQuote: 'newOrder/getMaxQuote',
      confirmDisplayed: 'newOrder/confirmDisplayed',
      pending: 'newOrder/inProgress'
    }),

    spendExceeded() {
      const quoteExceeded = this.quoteAmount > this.maxQuote
      const baseExceeded = this.baseAmount > this.maxBase
      return this.type === 'buy' ? quoteExceeded : baseExceeded
    },
    priceTitle() {
      return `Price ${this.quote}`
    },
    baseInputTitle() {
      const type = this.type === 'buy' ? 'Get' : 'Spend'
      return `${type} ${this.base}`
    },
    quoteInputTitle() {
      const type = this.type === 'buy' ? 'Spend' : 'Get'
      return `${type} ${this.quote}`
    },
    buttonTitle() {
      return `${getFloatCurrency(this.baseAmount || 0)} ${this.base}`
    },
    maxBaseTitle() {
      if (this.type === 'sell') return getFloatCurrency(this.maxBase)
      return getFloatCurrency(this.maxQuote * (this.price || 0))
    },
    maxQuoteTitle() {
      if (this.type === 'buy') return getFloatCurrency(this.maxQuote)
      return this.price ? getFloatCurrency(this.maxBase / this.price) : 0
    },
    invalidOrder() {
      return !this.baseAmount || !this.quoteAmount || this.spendExceeded
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
      setBaseAmount: 'newOrder/setBaseAmount',
      setQuoteAmount: 'newOrder/setQuoteAmount',
      setPrice: 'newOrder/setPrice',
      dispatchOrder: 'newOrder/dispatchOrder',
      showConfirm: 'newOrder/showConfirm',
      hideConfirm: 'newOrder/hideConfirm'
    }),
    setMaxSpend(percent = 100) {
      const max = this.type === 'buy' ? this.maxQuote : this.maxBase
      const amount = percent === 100 ? max : max / 100 * percent
      const price = this.price || 0
      if (this.type === 'buy') {
        this.setQuoteAmount(amount)
        this.setBaseAmount(amount * price)
      } else {
        this.setBaseAmount(amount)
        if (price) this.setQuoteAmount(amount / price)
      }
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
      padding: 0 0.5rem;
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
