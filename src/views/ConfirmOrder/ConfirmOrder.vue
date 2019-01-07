<template>
  <div
    :class="{
      'confirm-order--buy': type === 'buy',
      'confirm-order--sell': type === 'sell',
    }"
    class="confirm-order"
  >
    <div class="confirm-order-date">{{ confirmDate }}</div>
    <div class="confirm-order-title confirm-order-title--xl">{{ confirmTitle }}</div>

    <!-- SECTION 1 -->
    <div class="confirm-order-price-section">
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          :value="quoteAmount || null"
          :disabled="true"
          :title="quoteInputTitle"
          placeholder="Market"
        />
      </div>
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          :value="price || null"
          :disabled="true"
          :title="`Price ${quote}`"
          placeholder="Market"
        />
      </div>
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          :value="baseAmount || null"
          :disabled="true"
          :title="baseInputTitle"
          placeholder="Market"
        />
      </div>
    </div>
    <!-- SECTION 2 -->
    <!-- TODO: make new order input with type "comission" and provide select there -->
    <div class="confirm-order-comissions-section">
      <div
        v-if="tradingFee.value"
        class="item">
        <div class="description">
          Trading fee
        </div>
        <div class="value">
          {{ tradingFee }}
        </div>
      </div>
      <div class="item">
        <div class="description">
          Exchange fee
        </div>
        <div class="value">
          {{ exchangeFee }}
        </div>
      </div>
    </div>

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
      default: 'buy'
    },
    baseAmount: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      default: 0
    },
    quoteAmount: {
      type: Number,
      default: 0
    },
    fees: {
      type: Object,
      default: () => {}
    },
    pending: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    confirmTitle() {
      return `${this.type} ${this.quote}/${this.base}`
    },
    exchangeFee() {
      const { value, asset } = this.fees.transaction
      return `${value} ${asset}`
    },
    tradingFee() {
      const { value, asset } = this.fees.market
      return `${value} ${asset}`
    },
    confirmDate() {
      return format(new Date(), 'DD-MMM-YY, HH:mm')
    },
    baseInputTitle() {
      const type = this.type === 'buy' ? 'Spend' : 'Get'
      return `${type} ${this.base}`
    },
    quoteInputTitle() {
      const type = this.type === 'buy' ? 'Get' : 'Spend'
      return `${type} ${this.quote}`
    }
  }
}
</script>
<style lang="scss">
  .confirm-order {
    position: relative;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    background-color: config('colors.card-background');
  }
  .confirm-order-title {
    margin-top: 1.25rem;
    text-transform: uppercase;
    font-size: 0.9375rem;
    font-weight: bold;
    color: config('colors.primary');

    &--xl {
      margin-top: 0.625rem;
      font-size: config('textSizes.xl');
      letter-spacing: -0.0625rem;
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
    flex-direction: column;
  }
  .confirm-order-price-section-item {
    margin: .2rem;
  }
  .confirm-order-comissions-section {
    display: flex;
    margin-top: 0.9375rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: config('textSizes.4xl');

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      .description {
        margin: .1rem;
        font-size: config('textSizes.xxs-xs');
        color: config('colors.inactive');
      }

      .value {
        margin: .1rem;
        color: config('colors.primary');
        font-size: config('textSizes.xs');
      }
    }
  }
  .confirm-order {
    &--buy {
      .confirm-order-title {
        color: config('colors.buy');
      }
    }
    &--sell {
      .confirm-order-title {
        color: config('colors.sell');
      }
    }
  }

  @screen sm {
    .confirm-order-price-section {
      flex-direction: row;
    }
  }
</style>
