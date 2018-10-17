<template>
  <LoadingContainer :loading="!balancesItems.length">
    <div class="portfolio">
      <div class="grid-header">
        <span>Tiker</span>
        <span>Tokens</span>
        <span>$Value</span>
        <span>Share</span>
      </div>
      <div
        v-for="(item, index) in balancesItems"
        :key="index"
        class="grid-items"
      >
        <PortfolioItem
          :item="item"
          :total="totalBaseValue"/>
      </div>
    </div>
  </LoadingContainer>

</template>

<script>
import { mapGetters } from 'vuex'
import LoadingContainer from '@/components/LoadingContainer'
import PortfolioItem from './PortfolioItem.vue'

export default {
  components: { PortfolioItem, LoadingContainer },
  props: {
    fiatId: {
      type: String,
      required: false,
      default: '1.3.121'
    }
  },
  computed: {
    ...mapGetters({
      userBalances: 'acc/getUserBalances',
      getAssetById: 'assets/getAssetById',
      getMarketPriceById: 'market/getPriceById',
      getAssetMultiplier: 'history/getHistoryAssetMultiplier',
      getBaseValue: 'utility/getBalanceBaseValue'
    }),
    fiatAsset() {
      return this.getAssetById(this.fiatId)
    },
    fiatMultiplier() {
      const multiplier = { ...this.getAssetMultiplier(1, this.fiatId) }
      return multiplier.last
    },
    balancesItems() {
      const balances = this.userBalances
      if (!balances) return []

      return Object.keys(this.userBalances).map(assetId => {
        const asset = this.getAssetById(assetId)
        const tokens = balances[assetId].balance / 10 ** asset.precision
        const baseValue = this.getBaseValue({ assetId, value: balances[assetId].balance })
        const fiatValue = parseInt((baseValue * this.fiatMultiplier).toFixed(0), 10)
        const fiatPrecisedValue = fiatValue / (10 ** this.fiatAsset.precision)
        return {
          id: assetId,
          symbol: asset.symbol,
          tokens,
          baseValue,
          fiatValue: fiatPrecisedValue
        }
      })
    },
    totalBaseValue() {
      return this.balancesItems.reduce((result, currentBalance) => {
        return result + currentBalance.baseValue
      }, 0)
    }
  },
  getFiatValue(balance) {

  }
}
</script>

<style scoped lang="scss">
.portfolio {
  font-family: config("fonts.gotham");
}

.portfolio-options {
  font-family: config("fonts.gotham");
  color: config('colors.text-primary');
  display: flex;
  justify-content: space-between;
}

.options-header {
  padding: 0;
  text-transform: uppercase;
  &--centered {
    justify-content: center;
  }
}

.options-header .option {
  @apply font-gotham text-base py-3;
  @apply cursor-pointer;
  color: config('colors.tab-header');
  font-size: config('textSizes.xxs-xs');
  text-align: center;
  line-height: 0px;
  &--active {
    @apply cursor-default;
    color: config('colors.tab-active')!important;
    border-bottom: 2px solid config('colors.tab-header');
    border-bottom-color: config('colors.tab-active')!important;
  }
  &:hover {
    color:config('colors.tab-hover');
      border-bottom: 2px solid config('colors.tab-header');
    border-bottom-color: config('colors.tab-hover');
  }
}

.grid-header {
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  padding-bottom: config('padding.2');
  opacity: 0.5;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  // grid-column-gap: 30px;
  // grid-template-columns: repeat(2, 2fr);
}

.grid-header span {
    padding: 0px 0px;
    font-size: config('textSizes.xs-sm');
    &:not(:first-child) {
      text-align: right;
    }
}

</style>
