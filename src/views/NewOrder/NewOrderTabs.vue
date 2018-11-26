<template>
  <div
    :class="{
      'order-tabs--buy': activeTab === 'buy',
      'order-tabs--sell': activeTab === 'sell'
    }"
    class="order-tabs"
  >
    <div
      :class="{'_inactive': activeTab === 'sell'}"
      class="order-tabs-item _buy"
      @click="setActiveTab('buy')"
    >
      <NewOrderTabsTitle
        :title="buyTitle"
        :sub-title="buyPrice"
      />
    </div>
    <div
      :class="{'_inactive': activeTab === 'buy'}"
      class="order-tabs-item _sell"
      @click="setActiveTab('sell')"
    >
      <NewOrderTabsTitle
        :title="sellTitle"
        :sub-title="sellPrice"
        :is-sell="true"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import NewOrderTabsTitle from './NewOrderTabsTitle'

export default {
  components: {
    NewOrderTabsTitle
  },
  props: {
    activeTab: {
      type: String,
      default: 'buy'
    },
    currentBase: {
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
  data() {
    return {}
  },
  computed: {
    buyTitle() {
      return `BUY ${this.currentBase}/USD`
    },
    sellTitle() {
      return `SELL ${this.currentBase}/USD`
    }
  },
  methods: {
    ...mapActions({
      setActiveTab: 'newOrder/setActiveTab'
    })
  }
}
</script>
<style lang="scss">
  .order-tabs {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    .order-tabs-item {
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
          border-top: 0.3125rem solid config('colors.new-order-buy');
          color: config('colors.new-order-buy');

          .order-tabs-subtitle {
            color: config('colors.new-order-buy');
          }
        }
      }
    }
    &--sell {
      .order-tabs-item {
        &:not(._inactive) {
          border-top: 0.3125rem solid config('colors.new-order-sell');
          color: config('colors.new-order-sell');

          .order-tabs-subtitle {
            color: config('colors.new-order-sell');
          }
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
