<template>
  <div class="portfolio">
    <div class="grid-header">
      <span>Tiker</span>
      <span>Tokens</span>
      <!-- <span><strong>7d%</strong></span> -->
    </div>
    <div
      v-for="(item, index) in balancesAsArray"
      :key="index"
      class="grid-items"
    >
      <PortfolioItem :item="item" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PortfolioItem from './PortfolioItem.vue'

export default {
  components: { PortfolioItem },
  computed: {
    ...mapGetters({
      userBalances: 'acc/getCurrentUserBalances',
      getAssetById: 'assets/getAssetById',
      getHideList: 'assets/getHideList'
    }),
    balancesAsArray() {
      const balances = this.userBalances
      if (!balances) return []
      // filter balaces that are > 0 and generate array with symbols
      // and precised balances
      let balancesKeys = Object.keys(balances).filter(
        id => balances[id].balance
      )
      if (!this.editAssetsMode) {
        balancesKeys = balancesKeys.filter(id => !this.getHideList.includes(id))
      }

      return balancesKeys.map(id => {
        const asset = this.getAssetById(id)
        const visible = !this.getHideList.includes(id)
        return {
          id,
          symbol: asset.symbol,
          tokens: balances[id].balance / 10 ** asset.precision,
          visible
        }
      })
    }

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
  grid-column-gap: 30px;
  grid-template-columns: repeat(2, 2fr);
}

.grid-header span {
    padding: 0px 0px;
    font-size: config('textSizes.xs-sm');
    &:not(:first-child) {
      text-align: right;
    }
}

</style>
