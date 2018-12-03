<template>
  <LoadingContainer
    :loading="!historyLoaded"
    class="portfolio-container h-full">

    <MobileAccountHeader
      :large-mode="true"
      class="flex md:hidden"
    />

    <account-balance />

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
import LinkButton from '@/components/LinkButton'
import AccountBalance from '@/views/Account/AccountBalance'
import PortfolioItem from './PortfolioItem.vue'
import MobileAccountHeader from './MobileAccountHeader'

import SortableTable from '@/components/SortableTable'

export default {
  components: { AccountBalance, PortfolioItem, LoadingContainer, LinkButton, SortableTable, MobileAccountHeader },
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

<style lang="scss">
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
</style>
