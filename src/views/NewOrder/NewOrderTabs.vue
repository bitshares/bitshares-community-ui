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
        :sub-title="buyPrice"
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
        :sub-title="sellPrice"
        :in-active="type === 'buy'"
        type="sell"
      />
    </div>
  </div>
</template>
<script>
import NewOrderTabsTitle from './NewOrderTabsTitle'

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
        &:not(._inactive) {
          border-top: 0.3125rem solid config('colors.buy');
          color: config('colors.buy');
        }
      }
    }
    &--sell {
      .order-tabs-item {
        &:not(._inactive) {
          border-top: 0.3125rem solid config('colors.sell');
          color: config('colors.sell');
        }
      }
    }
    ._buy {
      color: rgba(121, 198, 15, .5);
    }
    ._sell {
      color: rgba(255, 47, 47, .5);
    }
    ._inactive {
      background: #212121;
    }
  }
</style>
