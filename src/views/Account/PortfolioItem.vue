<template>
  <div
    :class="{ 'portfolio-item--expanded': expanded }"
    :style="styleObject"
    class="portfolio-item"
  >
    <span class="single-item">
      {{ item.tiker }}
      <!-- <TwoLineItem :top="item.tiker"/> -->
    </span>
    <span
      v-show="expanded"
      class="deposit">deposit</span>
    <span
      v-show="expanded"
      class="withdraw">withdraw</span>

    <span v-show="isBalancesMode">
      <TwoLineItem
        :top="formattedTokens"
        :bottom="formattedFiatValue"
      />
    </span>

    <span
      v-show="isBalancesMode"
      class="text-right single-item"
    >
      {{ item.share }}%
    </span>

    <span v-show="isPricesMode">
      <TwoLineItem
        :top="formattedTokenPrice"
        :bottom="formattedBtcValue"
      />
    </span>

    <span
      v-show="isPricesMode"
      class="text-right single-item"
    >
      {{ item.change1.toFixed(0).toString() }}%
    </span>
    <!-- <span v-show="isPricesMode">{{ item.change7.toFixed(0).toString() }}%</span> -->
  </div>
</template>

<script>
import TwoLineItem from '@/components/TwoLineItem'
import { getFloatCurrency } from '@/helpers/utils'

export default {
  components: { TwoLineItem },
  props: {
    item: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isBalancesMode() {
      return this.mode === 'balances'
    },
    isPricesMode() {
      return this.mode === 'prices'
    },
    formattedTokens() {
      return getFloatCurrency(this.item.tokens)
    },
    formattedTokenPrice() {
      return '$' + this.preciseFiatValue(this.item.tokenPrice || 0)
    },
    formattedFiatValue() {
      return '$' + this.preciseFiatValue(this.item.fiatValue || 0)
    },
    formattedBtcValue() {
      return '₿ ' + getFloatCurrency(this.item.btcValue || 0)
    },
    styleObject() {
      const columns = this.expanded ? 6 : 3

      return {
        'grid-template-columns': `repeat(${columns}, 1fr)`
      }
    }
  },
  methods: {
    preciseFiatValue(value, precision = 1) {
      if (!value) return 0
      if (value > 10) return Math.floor(value)
      if (value > 0.1) return value.toFixed(precision)
      return value.toFixed(2)
    }
  }
}
</script>

<style scoped lang="scss">

.portfolio-item {
  color: config('colors.text-primary');
  padding: config('padding.grid-table');
  font-size: config('textSizes.sm');
  display: grid;
  padding-left: 0;
  padding-right: 0;
  transition: background-color 0.15s ease;
  padding: config('padding.grid-table') 1.5rem config('padding.grid-table') 1rem;
  &:hover {
    position: relative;
    z-index: 2;
    background-color: #131313;
  }
}

.portfolio-item--expanded {
  font-size: config('textSizes.lg');
  .deposit, .withdraw {
    font-size: config('textSizes.base');
  }
}

.portfolio-item span {
    // padding: 0px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    &.single-item {
      font-size: config('textSizes.xl');
      align-self: center;
    }
}

.deposit {
  color: config('colors.deposit-green');
  text-transform: uppercase;
  cursor: pointer;
}

.withdraw {
  color: config('colors.withdraw-red');
  text-transform: uppercase;
  cursor: pointer;
}

</style>
