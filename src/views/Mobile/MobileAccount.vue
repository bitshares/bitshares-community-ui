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

    <div class="balance">
      <span class="title">BALANCE</span>
      <span class="amount">$ {{ totalFiatValue ? totalFiatValue.toFixed(2) : 0 }}</span>
    </div>

    <div class="portfolio-header">
      <LinkButton
        :title="hideSmallAssetsBtnText"
        :large="expanded"
        @click.native="showSmallAssets = !showSmallAssets"
      />
      <LinkButton
        :title="`show ${inactiveMode}`"
        :large="expanded"
        @click.native="toggleMode"/>
    </div>

    <div class="portfolio-table">
      <SortableTable
        :items="filteredItems"
        :headers="expanded ? tableHeadersExpanded : tableHeaders"
        :default-sort="defaultSort"
        :header-left-padding="1"
        :header-right-padding="1.5"
        :large="expanded"
        class="portfolio-table__header"
      >
        <template slot-scope="{ sortedItems }">
          <PortfolioItem
            v-for="(item, index) in sortedItems"
            :key="index"
            :mode="mode"
            :item="item"
            :expanded="expanded"
          />
        </template>
      </SortableTable>
    </div>

  </LoadingContainer>

</template>

<script>
import { mapGetters } from 'vuex'
import LoadingContainer from '@/components/LoadingContainer'
import Button from '@/components/Button'
import LinkButton from '@/components/LinkButton'
import SortableTable from '@/components/SortableTable'
import PortfolioItem from '@/views/Account/PortfolioItem.vue'

export default {
  components: { Button, PortfolioItem, LoadingContainer, LinkButton, SortableTable },
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

.balance {
  margin: 2rem 0;
  .title, .amount {
    color: config('colors.text-primary');
    display: block;
    text-align: center;
  }

  .title {
    font-size: config('textSizes.lg');
    margin-bottom: 0.5rem;
    opacity: 0.5;
    font-size: config('textSizes.sm');
    line-height: normal;
    margin-right: 0.5rem;
  }

  .amount {
    font-size: config('textSizes.5xl')
  }
}

.mobile-account-header {
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .mobile-account-header-btn {
    width: 165px;
    height: 48px;

    margin: 0px 7px;
    line-height: 20px;
    background-color: black;

    &:hover {
      background-color: config('colors.white');
    }
  }
}
</style>
