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
        :title="buyTitle"
        :sub-title="buyPrice"
      />
      <svgicon
        width="12"
        height="12"
        name="high"
        class="order-tabs-item-icon"
      />
    </div>
    <div
      :class="{'_inactive': type === 'buy'}"
      class="order-tabs-item _sell"
      @click="$emit('change', 'sell')"
    >
      <NewOrderTabsTitle
        :title="sellTitle"
        :sub-title="sellPrice"
        :is-sell="true"
      />
      <svgicon
        width="12"
        height="12"
        name="low"
        class="order-tabs-item-icon"
      />
    </div>
  </div>
</template>
<script>
import NewOrderTabsTitle from './NewOrderTabsTitle'
import '@/assets/icons/low'
import '@/assets/icons/high'

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
    buyTitle() {
      return `BUY ${this.base}/${this.quote}`
    },
    sellTitle() {
      return `SELL ${this.base}/${this.quote}`
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
      height: 3.5625rem;
      text-align: center;
      font-weight: config('fontWeights.extrabold');
      font-size: config('textSizes.lg');
      cursor: pointer;
    }
    &--buy {
      .order-tabs-item {
        &:not(._inactive) {
          border-top: 0.3125rem solid config('colors.buy');
          color: config('colors.buy');

          .order-tabs-subtitle {
            color: config('colors.buy');
          }
        }
      }
    }
    &--sell {
      .order-tabs-item {
        &:not(._inactive) {
          border-top: 0.3125rem solid config('colors.sell');
          color: config('colors.sell');

          .order-tabs-subtitle {
            color: config('colors.sell');
          }
        }
      }
    }
    ._buy {
      color: rgba(121, 198, 15, .5);
      .order-tabs-item-icon {
        position: absolute;
        right: 3.875rem;
        top: 2.1875rem;
      }
    }
    ._sell {
      color: rgba(255, 47, 47, .5);
      .order-tabs-item-icon {
        position: absolute;
        left: 3.625rem;
        top: 2.1875rem;
      }
    }
    ._inactive {
      background: #212121;
    }
  }
</style>
