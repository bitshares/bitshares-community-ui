<template>
  <LoadingContainer
    :loading="!historyLoaded"
    class="portfolio-container h-full">

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
import PortfolioItem from './PortfolioItem.vue'

import SortableTable from '@/components/SortableTable'

export default {
  components: { PortfolioItem, LoadingContainer, LinkButton, SortableTable },
  props: {
    expanded: {
      type: Boolean,
      default: false,
    }
  },
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
    tableHeadersExpanded() {
      const headers = this.tableHeaders.slice()
      headers.splice(1, 0, {
        title: '', field: '', align: 'center'
      }, { title: '', field: '', align: 'center' })

      return headers
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
