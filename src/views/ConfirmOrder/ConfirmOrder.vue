<template>
  <div class="confirm-order">
    <div class="confirm-order-date">{{ confirmDate }}</div>
    <div class="confirm-order-title confirm-order-title--xl">{{ confirmTitle }}</div>

    <!-- SECTION 1 -->
    <div class="confirm-order-price-section">
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          :value="price || ''"
          :disabled="true"
          :title="`Price ${quote}`"
        />
      </div>
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          :value="quoteAmount || ''"
          :disabled="true"
          :title="quoteInputTitle"
        />
      </div>
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          :value="baseAmount || ''"
          :disabled="true"
          :title="baseInputTitle"
        />
      </div>
    </div>
    <!-- SECTION 2 -->
    <!-- <div class="confirm-order-price-section">
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          :placeholder="tradingFee.toString()"
          :note="tradingFeeTitle"
          :disabled="true"
          title="Trading fee. USD"
        />
      </div>
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          :placeholder="exchangeFee.toString()"
          :note="exchangeFeeTitle"
          :disabled="true"
          title="Exchange fee. USD"
        />
      </div>
    </div> -->

    <!-- <SInput
      v-if="isLocked"
      v-model="password"
      :password="true"
      type="number"
      title="UNLOCK WALLET"
    /> -->

  </div>
</template>
<script>
import NewOrderInput from '@/views/NewOrder/NewOrderInput'
import format from 'date-fns/format'

export default {
  components: {
    NewOrderInput
  },
  props: {
    base: {
      type: String,
      required: true
    },
    quote: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    baseAmount: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quoteAmount: {
      type: Number,
      required: true
    },
    tradingFee: {
      type: Number,
      default: 0
    },
    exchangeFee: {
      type: Number,
      default: 0
    },
    pending: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    confirmTitle() {
      return `${this.type} ${this.base}/${this.quote}`
    },
    tradingFeeTitle() {
      return `~${this.tradingFee} ${this.quote}`
    },
    exchangeFeeTitle() {
      return `~${this.exchangeFee} ${this.quote}`
    },
    confirmDate() {
      return format(new Date(), 'DD-MMM-YY, HH:mm')
    },
    baseInputTitle() {
      const type = this.type === 'buy' ? 'Get' : 'Spend'
      return `${type} ${this.base}`
    },
    quoteInputTitle() {
      const type = this.type === 'buy' ? 'Spend' : 'Get'
      return `${type} ${this.quote}`
    },
  }
}
</script>
<style lang="scss">
  .confirm-order {
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30rem;
    background-color: config('colors.card-background');
  }
  .confirm-order-title {
    margin-top: 1.25rem;
    text-transform: uppercase;
    font-size: 0.9375rem;
    font-weight: config('fontWeights.semibold');
    color: config('colors.primary');

    &--xl {
      margin-top: 0.625rem;
      font-size: config('textSizes.xl');
      letter-spacing: -0.0625rem;
      font-weight: normal;
    }
  }
  .confirm-order-date {
    margin-top: 0.625rem;
    color: config('colors.inactive');
    font-size: config('textSizes.base');
    letter-spacing: normal;
    text-transform: uppercase;
  }

  .confirm-order-price-section {
    display: flex;
    justify-content: center;
    margin-top: 0.9375rem;
  }
  .confirm-order-price-section-item {
    margin: .2rem;
  }
</style>
