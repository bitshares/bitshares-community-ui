<template>
  <div
    :class="{ 'portfolio-item--expanded': expanded }"
    :style="styleObject"
    class="portfolio-item"
  >
    <div>
      <div
        v-if="expanded"
        class="single-item">{{ formattedTicker }}</div>
      <TwoLineItem
        v-else
        :top="formattedTicker"
        :bottom="formattedFullname"/>
    </div>

    <div
      v-show="expanded"
      class="single-item deposit"
      @click="openDeposit"
    >
      deposit
    </div>
    <div
      v-show="expanded"
      :class="{'withdraw--disabled': !withdrawActive}"
      class="single-item withdraw"
      @click="openWithdraw"
    >
      withdraw
    </div>

    <div
      v-show="isBalancesMode && expanded"
      class="text-right single-item"
    >
      {{ formattedTokens }}
    </div>

    <div v-show="isBalancesMode">
      <TwoLineItem
        v-if="!expanded"
        :top="formattedTokens"
        :bottom="formattedFiatValue"
      />
      <div
        v-else
        class="text-right single-item">{{ formattedFiatValue }}</div>
    </div>

    <div
      v-show="isBalancesMode"
      class="text-right single-item"
    >
      {{ item.share }}%
    </div>

    <div v-show="isPricesMode">
      <TwoLineItem
        v-if="!expanded"
        :top="formattedTokenPrice"
      >
        <div slot="bottom"><b>₿</b> {{ formattedBtcValue }}</div>
      </TwoLineItem>
      <div
        v-else
        class="text-right single-item">{{ formattedTokenPrice }}</div>
    </div>

    <div
      v-show="isPricesMode"
      class="text-right single-item"
    >
      {{ item.change1.toFixed(0).toString() }}%
    </div>
    <div
      v-show="isPricesMode && expanded"
      class="text-right">{{ item.change7.toFixed(0).toString() }}%</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TwoLineItem from '@/components/TwoLineItem'
import { getFloatCurrency, shortenFiatValue, removePrefix } from '@/helpers/utils'

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
    ...mapGetters({
      getAssetBySymbol: 'assets/getAssetBySymbol'
    }),
    withdrawActive() {
      return this.getAssetBySymbol(this.item.tiker).issuer === '1.2.96397'
    },
    isBalancesMode() {
      return this.mode === 'balances'
    },
    isPricesMode() {
      return this.mode === 'prices'
    },
    formattedTicker() {
      return removePrefix(this.item.tiker)
    },
    formattedFullname() {
      return this.item.fullname
    },
    formattedTokens() {
      return getFloatCurrency(this.item.tokens)
    },
    formattedTokenPrice() {
      return '$' + shortenFiatValue(this.item.tokenPrice || 0)
    },
    formattedFiatValue() {
      return '$' + shortenFiatValue(this.item.fiatValue || 0)
    },
    formattedBtcValue() {
      return getFloatCurrency(this.item.btcValue || 0)
    },
    styleObject() {
      const columns = this.expanded ? 6 : 3

      return {
        'grid-template-columns': `repeat(${columns}, 1fr)`
      }
    }
  },
  methods: {
    ...mapActions({
      showDepositModal: 'deposit/toggleModal',
      showWithdrawModal: 'withdraw/toggleModal',
      setWithdrawAsset: 'withdraw/setWithdrawAsset',
      setWithdrawStep: 'withdraw/setWithdrawStep'
    }),
    openDeposit() {
      this.showDepositModal()
    },
    openWithdraw(asset) {
      if (this.withdrawActive) {
        this.showWithdrawModal('withdraw')
        this.setWithdrawAsset({ asset: this.item })
        this.setWithdrawStep('withdrawConfirmAmount')
      }
    }
  }
}
</script>

<style scoped lang="scss">

.portfolio-item {
  color: config('colors.text-primary');
  font-size: config('textSizes.sm');
  display: grid;
  align-items: center;
  padding-left: 0;
  padding-right: 0;
  transition: background-color 0.15s ease;
  padding: 0 1.5rem 0 1rem;
  min-height: 3.125rem;
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

.portfolio-item div {
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

  &--disabled {
    color: config('colors.sell-disabled');
    cursor: default;
  }
}

</style>
