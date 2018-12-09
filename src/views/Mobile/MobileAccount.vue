<template>
  <LoadingContainer
    :loading="!historyLoaded"
    class="portfolio-container h-full">

    <div class="mobile-account-header">
      <div class="xs:w-1/2 sm:w-1/2">
        <Button
          class="mobile-account-header-btn"
          text="Deposit"
          type="secondary"
        />
      </div>

      <div class="xs:w-1/2 sm:w-1/2">
        <Button
          class="mobile-account-header-btn"
          text="Withdraw"
          type="secondary"
        />
      </div>
    </div>

    <AccountHeader
      :large-mode="true"
      class="flex md:hidden"
    />

    <Portfolio />

  </LoadingContainer>

</template>

<script>
import { mapGetters } from 'vuex'
import LoadingContainer from '@/components/LoadingContainer'
import Button from '@/components/Button'
import Portfolio from '@/views/Account/Portfolio'
import AccountHeader from '@/views/Account/AccountHeader'

export default {
  components: { Button, AccountHeader, Portfolio, LoadingContainer },
  props: {
    expanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mode: 'balances',
      showSmallAssets: true,
      defaultSort: {
        field: 'share',
        type: 'desc'
      }
    }
  },
  computed: {
    ...mapGetters({
      items: 'portfolio/getItems',
      historyLoaded: 'history/initialLoaded',
      totalFiatValue: 'portfolio/getTotalFiatValue'
    }),
    tableHeaders() {
      return this.mode === 'balances' ? [
        { title: 'Asset', field: 'tiker', align: 'left' },
        { title: 'Balance', field: 'tokens', align: 'left' },
        { title: 'Share', field: 'share' }
      ] : [
        { title: 'Asset', field: 'tiker', align: 'left' },
        { title: 'Price', field: 'tokenPrice', align: 'left' },
        { title: '24h', field: 'change1' }
      ]
    },
    tableHeadersExpanded() {
      return this.mode === 'balances' ? [
        { title: 'Asset', field: 'tiker', align: 'left' },
        { title: '', field: '', align: 'center' },
        { title: '', field: '', align: 'center' },
        { title: 'Tokens', field: 'tokens', align: 'right' },
        { title: '$Value', field: 'usdValue', align: 'right' },
        { title: 'Share', field: 'share', align: 'right' }
      ] : [
        { title: 'Asset', field: 'tiker', align: 'left' },
        { title: '', field: '', align: 'center' },
        { title: '', field: '', align: 'center' },
        { title: 'Price', field: 'tokenPrice', align: 'right' },
        { title: '24h', field: 'change1', align: 'right' },
        { title: '7d', field: 'change7', align: 'right' }
      ]
    },
    filteredItems() {
      if (this.showSmallAssets) return this.items
      return this.items.filter(item => item.fiatValue >= 5)
    },
    inactiveMode() {
      return this.mode === 'balances' ? 'prices' : 'balances'
    },
    hideSmallAssetsBtnText() {
      return this.showSmallAssets ? 'hide small assets' : 'show all assets'
    }
  },
  methods: {
    toggleMode() {
      this.mode = this.inactiveMode
    }
  }
}
</script>

<style lang="scss" scoped>
.portfolio-table {
  height: 100%;
  overflow: hidden;
}

.portfolio-header {
  font-family: config("fonts.gotham");
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding: 0 1.5rem 0 1rem;
}

.mobile-account-header {
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .mobile-account-header-btn {
    width: 10.3rem;
    height: 3rem;

    margin: 0 .5rem;
    line-height: 1.5rem;
    background-color: black;

    &:hover {
      background-color: config('colors.white');
    }
  }
}
</style>
