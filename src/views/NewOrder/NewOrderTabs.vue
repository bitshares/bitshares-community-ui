<template>
  <div
    :class="{
      'order-tabs--buy': type === 'buy',
      'order-tabs--sell': type === 'sell'
    }"
    class="order-tabs"
  >
    <div
      :class="{'_inactive': type === 'sell'}"
      class="order-tabs-item _buy"
      @click="$emit('change', 'buy')"
    >
      <NewOrderTabsTitle
        :title="getTitle('buy')"
        :sub-title="formattedBuyPrice"
        :in-active="type === 'sell'"
        type="buy"
      />
    </div>
    <div
      :class="{'_inactive': type === 'buy'}"
      class="order-tabs-item _sell"
      @click="$emit('change', 'sell')"
    >
      <NewOrderTabsTitle
        :title="getTitle('sell')"
        :sub-title="formattedSellPrice"
        :in-active="type === 'buy'"
        type="sell"
      />
    </div>
  </div>
</template>
<script>
import NewOrderTabsTitle from './NewOrderTabsTitle'
import { getFloatCurrency } from '@/helpers/utils'

export default {
  components: {
    NewOrderTabsTitle
  },
  props: {
    type: {
      type: String,
      default: 'buy'
    },
    base: {
      type: String,
      default: 'USD'
    },
    quote: {
      type: String,
      default: 'USD'
    },
    buyPrice: {
      type: Number,
      default: 0
    },
    sellPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    formattedBuyPrice() {
      return this.buyPrice ? getFloatCurrency(this.buyPrice) : ''
    },
    formattedSellPrice() {
      return this.sellPrice ? getFloatCurrency(this.sellPrice) : ''
    }
  },
  methods: {
    getTitle(type) {
      return `${type.toUpperCase()} ${this.base}/${this.quote}`
    }
  }
}
</script>
<style lang="scss">
  .order-tabs {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    .order-tabs-item {
      position: relative;
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      text-align: center;
      font-weight: config('fontWeights.extrabold');
      font-size: config('textSizes.lg');
      cursor: pointer;
    }
    &--buy {
      .order-tabs-item {
        border-top: 0.3125rem solid transparent;
        &:not(._inactive) {
          border-top: 0.3125rem solid config('colors.buy');
          color: config('colors.buy');
        }
      }
    }
    &--sell {
      .order-tabs-item {
        border-top: 0.3125rem solid transparent;
        &:not(._inactive) {
          border-top: 0.3125rem solid config('colors.sell');
          color: config('colors.sell');
        }
      }
    }
    ._buy {
      color: config('colors.buy-disabled');
    }
    ._sell {
      color: config('colors.sell-disabled');
    }
    ._inactive {
      background: #212121;
    }
  }
</style>
