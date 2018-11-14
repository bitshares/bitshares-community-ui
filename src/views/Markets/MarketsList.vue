<template>
  <div
    :class="{'tickers-list_expanded': expandMode}"
    class="tickers-list"
  >
    <SortableTable
      :items="items"
      :headers="fields"
      :default-sort="defaultSort"
      :header-left-padding="0.6"
      :header-right-padding="1"
      :large="expandMode"
      class="tickers-list-header"
    >
      <template slot-scope="{ sortedItems }">
        <MarketsListItem
          v-for="(ticker, index) in sortedItems"
          :key="index"
          :item="ticker"
          :current-base="currentBase"
          :expand-mode="expandMode"
          :is-favourite="isFavourite(ticker)"
        />
      </template>
    </SortableTable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MarketsListItem from './MarketsListItem'
import SortableTable from '@/components/SortableTable'

export default {
  components: {
    MarketsListItem,
    SortableTable
  },
  props: {
    currentBase: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    expandMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultSort: {
        field: 'usdVolume',
        type: 'desc'
      },
      marketsField: {
        small: [
          { title: 'Pair', field: 'ticker', align: 'left', paddingLeft: 1.5 },
          { title: 'Price, USD', field: 'usdPrice', align: 'right' },
          { title: 'Vol, USD', field: 'usdVolume', align: 'right' },
          { title: '24h', field: 'change24h', align: 'right' }
        ],
        large: [
          { title: 'Name', field: 'ticker', align: 'left', paddingLeft: 1.5 },
          { title: 'Volume, USD', field: 'usdVolume', align: 'left' },
          { title: 'Price, USD', field: 'usdPrice', align: 'left' },
          { title: '24h', field: 'change24h', align: 'center' },
          { title: '7d', field: 'change7d', align: 'center' }
          // { title: 'Market, USD', field: 'marketcap', align: 'right' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      isTickerFavourite: 'marketsMonitor/isTickerFavourite'
    }),

    fields() {
      return this.expandMode ? this.marketsField.large : this.marketsField.small
    }
  },
  methods: {
    isFavourite(item) {
      return this.isTickerFavourite(item.base, item.ticker)
    }
  }
}
</script>

<style lang="scss">
  .tickers-list {
    margin-top: 0.8rem;
    height: 100%;
    overflow: hidden;

    .tickers-list-head {
      display: flex;
      box-sizing: border-box;
      padding: 0.4375rem;
    }
  }
</style>
