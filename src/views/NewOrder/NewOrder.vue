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
      :tabs="possibleIndications"
      :active="activeIndication"
      @change="changeOrderType"
    />
    <NewOrderCirclePrice :percent="0"/>
    <NewOrderCircleType :value="0"/>
    <NewOrderPercentSelector
      :percent-items="percentItems"
      @change="setMaxSpend"
    />
    <div class="new-order-fields">
      <NewOrderInput
        :placeholder="amountPlaceholder('quote')"
        :value="quoteAmount"
        :note="amountNote('quote')"
        :error="spendExceeded"
        :title="quoteInputTitle"
        :disabled="isMarketTab && !isBuyTab"
        @change="setQuoteAmount"
        @note-click="setMaxSpend"
      />
      <NewOrderInput
        :placeholder="amountPlaceholder('base')"
        :value="baseAmount"
        :title="baseInputTitle"
        :error="spendExceeded"
        :disabled="isMarketTab && isBuyTab"
        :note="amountNote('base')"
        @change="setBaseAmount"
        @note-click="setMaxSpend"
      />
    </div>
    <div class="new-order-price">
      <NewOrderInput
        :title="priceTitle"
        :value="(price === 0) ? null : price"
        :disabled="isMarketTab"
        :placeholder="getPricePlaceholder"
        @change="setPrice"
      />
    </div>

    <div class="new-order-button">
      <Btn
        :type="type"
        :disabled="invalidOrder && invalidOrderMarket"
        :text="buttonTitle"
        width="full"
        @click="clickCreateOrder"
      >
        <span class="operation-title">{{ type }}</span>
      </Btn>
    </div>
    <!-- CONFIRM ORDER -->
    <ConfirmModal
      :show="confirmDisplayed"
      :pending="pending"
      :type="type"
      title="confirm order"
      @close="hideConfirm"
      @confirm="handleOrderConfirm"
    >
      <ConfirmOrder
        :base="base"
        :quote="quote"
        :type="type"
        :price="price"
        :base-amount="baseAmount"
        :quote-amount="quoteAmount"
        :fees="fees"
        @close="hideConfirm"
      />
    </ConfirmModal>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import NewOrderTabs from './NewOrderTabs'
import NewOrderInput from './NewOrderInput'
import NewOrderPercentSelector from './NewOrderPercentSelector'
import Btn from '@/components/Button/Button'
import Tabs from '@/components/Tabs/Tabs'
import ConfirmOrder from '@/views/ConfirmOrder/ConfirmOrder'
import Modal from '@/components/Modal'
import ConfirmModal from '@/views/ConfirmModal/ConfirmModal.vue'
import NewOrderCirclePrice from './NewOrderCirclePrice'
import NewOrderCircleType from './NewOrderCircleType'
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
    ConfirmModal,
    NewOrderCirclePrice,
    NewOrderCircleType
  },
  computed: {
    ...mapGetters({
      base: 'newOrder/getBase',
      quote: 'newOrder/getQuote',
      type: 'newOrder/getType',
      activeIndication: 'newOrder/getActiveIndication',
      possibleIndications: 'newOrder/getPossibleIndications',
      percentItems: 'newOrder/getPercentItems',
      activePercent: 'newOrder/getActivePercent',
      baseAmount: 'newOrder/getBaseAmount',
      quoteAmount: 'newOrder/getQuoteAmount',
      price: 'newOrder/getPrice',
      fees: 'newOrder/getFees',
      marketPrices: 'newOrder/getMarketPrices',
      maxBase: 'newOrder/getMaxBase',
      maxQuote: 'newOrder/getMaxQuote',
      confirmDisplayed: 'newOrder/confirmDisplayed',
      pending: 'newOrder/inProgress',
      hasFeeBalance: 'newOrder/hasFeeBalance'
    }),
    getPricePlaceholder() {
      return (this.isMarketTab) ? 'MARKET' : 'PRICE'
    },
    isMarketTab() {
      return this.activeIndication === 'MARKET'
    },
    isBuyTab() {
      return this.type === 'buy'
    },
    spendExceeded() {
      const quoteExceeded = this.quoteAmount > this.maxQuote
      const baseExceeded = this.baseAmount > this.maxBase
      return this.type === 'buy' ? quoteExceeded : baseExceeded
    },
    priceTitle() {
      return `Price ${this.quote}`
    },
    baseInputTitle() {
      const type = this.isBuyTab ? 'Get' : 'Spend'
      if (this.isMarketTab) {
        if (!this.isBuyTab) {
          return (this.baseAmount !== null) ? `${type} ${this.base}` : type
        } else {
          return `${type} ${this.base}`
        }
      } else {
        return (this.baseAmount !== null) ? `${type} ${this.base}` : type
      }
    },
    quoteInputTitle() {
      const type = this.isBuyTab ? 'Spend' : 'Get'
      if (this.isMarketTab) {
        if (this.isBuyTab) {
          return (this.quoteAmount !== null) ? `${type} ${this.quote}` : type
        } else {
          return `${type} ${this.quote}`
        }
      } else {
        return (this.quoteAmount !== null) ? `${type} ${this.quote}` : type
      }
    },
    buttonTitle() {
      const amount = (this.isMarketTab) ? '' : getFloatCurrency(this.baseAmount || 0)
      return `${amount} ${this.base}`
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
    invalidOrderMarket() {
      if (this.activeIndication !== 'MARKET') return true
      return ((this.type === 'buy' && !this.quoteAmount) || (this.type === 'sell' && !this.baseAmount))
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
    clickCreateOrder() {
      if (this.hasFeeBalance) {
        this.showConfirm()
      } else {
        Vue.prototype.$toast.error('Not enough BTS to place order')
      }
    },
    amountNote(side) {
      if (this.isMarketSide(side)) return null
      if (side === 'base') return `max ${this.maxBaseTitle}`
      if (side === 'quote') return `max ${this.maxQuoteTitle}`
    },
    amountPlaceholder(side) {
      if (this.isMarketSide(side)) {
        return 'MARKET'
      } else {
        return this[side]
      }
    },
    isMarketSide(side) {
      if (this.activeIndication === 'MARKET') {
        return ((this.type === 'buy' && side === 'base') || (this.type === 'sell' && side === 'quote'))
      }
      return false
    },
    changeOrderType(type) {
      if (type === 'MARKET') {
        this.setPrice(0)
      }
      this.setActiveIndication(type)
    },
    setMaxSpend(percent = 100) {
      this.setActivePercent(percent)
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
    },
    async handleOrderConfirm() {
      const unlocked = await this.$unlock()
      if (unlocked) {
        this.dispatchOrder()
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
