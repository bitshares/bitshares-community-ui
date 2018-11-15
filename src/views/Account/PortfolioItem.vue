<template>
  <div
    :class="{ 'portfolio-item--expanded': expanded }"
    :style="styleObject"
    class="portfolio-item"
  >
    <span>{{ item.tiker }}</span>
    <span
      v-show="expanded"
      class="deposit">deposit</span>
    <span
      v-show="expanded"
      class="withdraw">withdraw</span>
    <span v-show="isBalancesMode">{{ formattedTokens }}</span>
    <span v-show="isBalancesMode">{{ formattedFiatValue }}</span>
    <span v-show="isBalancesMode">{{ item.share }}%</span>
    <span v-show="isPricesMode">{{ formattedTokenPrice }}</span>
    <span v-show="isPricesMode">{{ item.change1.toFixed(0).toString() }}%</span>
    <span v-show="isPricesMode">{{ item.change7.toFixed(0).toString() }}%</span>
  </div>
</template>

<script>
export default {
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
      return this.item.tokens.toFixed(2)
    },
    formattedTokenPrice() {
      return this.preciseFiatValue(this.item.tokenPrice || 0)
    },
    formattedFiatValue() {
      return this.preciseFiatValue(this.item.fiatValue || 0)
    },
    styleObject() {
      const columns = this.expanded ? 6 : 4

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
    padding: 0px 0px;

    overflow: hidden;
    text-overflow: ellipsis;
    &:not(:first-child) {
      text-align: right;
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
