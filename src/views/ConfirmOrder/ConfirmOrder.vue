<template>
  <div class="confirm-order">
    <div
      class="confirm-order-close"
      @click="$emit('close', false)"
    >
      <svgicon
        width="12"
        height="12"
        color="rgba(255,255,255,0.5)"
        name="cancel"
      />
    </div>
    <div class="confirm-order-title">Confirm order</div>
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
          :value="spend || ''"
          :disabled="true"
          :title="`Spend ${spendAsset}`"
        />
      </div>
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          :value="get || ''"
          :disabled="true"
          :title="`Get ${getAsset}`"
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

    <SInput
      v-if="isLocked"
      v-model="password"
      :password="true"
      type="number"
      title="UNLOCK WALLET"
    />

    <div class="confirm-order-buttons">
      <Button
        :disabled="confirmDisabled"
        :loading="pending"
        text="Confirm"
        width="full"
        class="confirm-order-btn"
        @click="handleConfirm"
      />
      <Button
        text="Cancel"
        width="full"
        type="faded"
        class="confirm-order-btn"
        @click="$emit('close', false)"
      />
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button'
import NewOrderInput from '@/views/NewOrder/NewOrderInput'
import SInput from '@/components/SimpleInput'
import { mapGetters, mapActions } from 'vuex'
import format from 'date-fns/format'

export default {
  components: {
    Button,
    NewOrderInput,
    SInput
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
    get: {
      type: Number,
      required: true
    },
    spend: {
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
  data: () => ({
    password: ''
  }),
  computed: {
    ...mapGetters({
      isValidPassword: 'acc/isValidPassword',
      isLocked: 'acc/isLocked'
    }),
    confirmDisabled() {
      return this.isLocked && !this.password
    },
    confirmTitle() {
      return `${this.type} ${this.base}/${this.quote}`
    },
    price() {
      return this.type === 'buy' ? this.spend / this.get : this.get / this.spend
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
    spendAsset() {
      return this.type === 'buy' ? this.quote : this.base
    },
    getAsset() {
      return this.type === 'buy' ? this.base : this.quote
    }
  },
  methods: {
    ...mapActions({
      unlockWallet: 'acc/unlockWallet'
    }),
    handleConfirm() {
      if (this.isLocked) {
        if (this.isValidPassword(this.password + '')) {
          this.unlockWallet(this.password + '')
        } else {
          this.$toast.error('WRONG PASSWORD')
          return
        }
      }
      this.$emit('confirm')
    }
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
    width: 22.1875rem;
    height: 21.875rem;
    background-color: config('colors.card-background');
  }
  .confirm-order-close {
    position: absolute;
    right: 0.625rem;
    top: 0.4375rem;
    cursor: pointer;
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
  .confirm-order-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: auto .620rem .620rem .620rem;
    padding: .5rem;

    .confirm-order-btn {
      font-weight: normal;
      font-size: config('textSizes.lg');
    }
  }

  .confirm-order-price-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 80%;
    margin-top: 0.9375rem;
  }
  .confirm-order-price-section-item {
    margin: .2rem;
  }
</style>
