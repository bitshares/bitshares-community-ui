<template>
  <LoadingContainer
    :loading="!historyLoaded"
    class="portfolio-container h-full">

    <AccountHeader
      :large-mode="true"
      class="flex md:hidden"
    />

    <div class="portfolio-header">
      <LinkButton
        :title="hideSmallAssetsBtnText"
        @click.native="showSmallAssets = !showSmallAssets"
      />
      <LinkButton
        :title="`show ${inactiveMode}`"
        @click.native="toggleMode"/>
    </div>

    <div class="portfolio-table">
      <SortableTable
        :items="filteredItems"
        :headers="tableHeaders"
        :default-sort="defaultSort"
        :header-left-padding="1"
        :header-right-padding="1.5"
        class="portfolio-table__header"
      >
        <template slot-scope="{ sortedItems }">
          <PortfolioItem
            v-for="(item, index) in sortedItems"
            :key="index"
            :mode="mode"
            :item="item"
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
import PortfolioItem from './PortfolioItem.vue'
import AccountHeader from './AccountHeader'

import SortableTable from '@/components/SortableTable'

export default {
  components: { PortfolioItem, LoadingContainer, LinkButton, SortableTable, AccountHeader },
  data() {
    return {
      mode: 'balances',
      showSmallAssets: true,
      defaultSort: {
        field: 'fiatValue',
        type: 'desc'
      }
    }
  },
  computed: {
    ...mapGetters({
      items: 'portfolio/getItems',
      historyLoaded: 'history/initialLoaded'
    }),
    tableHeaders() {
      return this.mode === 'balances' ? [
        { title: 'Tiker', field: 'tiker', align: 'left' },
        { title: 'Tokens', field: 'tokens' },
        { title: '$Value', field: 'fiatValue' },
        { title: 'Share', field: 'share' }
      ] : [
        { title: 'Tiker', field: 'tiker', align: 'left' },
        { title: '$Price', field: 'tokenPrice' },
        { title: '24h%', field: 'change1' },
        { title: '7d%', field: 'change7' }
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
  font-family: config("fonts.gotham");
  height: 100%;
  overflow: hidden;
}

.portfolio-header {
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding: 0 1.5rem 0 1rem;
}
</style>
