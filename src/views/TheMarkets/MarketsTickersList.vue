<template>
  <div
    :class="{'tickers-list_expanded': expandMode}"
    class="tickers-list"
  >
    <SortableTable
      :items="sortedItems"
      :headers="fields"
      :default-sort="sortField"
      class="tickers-list-header"
    >
      <template slot-scope="{ sortedItems }">
        <MarketsTickersListItem
          v-for="(ticker, index) in sortedItems"
          :key="index"
          :item="ticker"
          :current-ticker="currentTicker"
          :expand-mode="expandMode"
          :is-favourite="isFavourite(ticker)"
          @change="changeFavourite"
        />
      </template>
    </SortableTable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MarketsTickersListItem from './MarketsTickersListItem'
import SortableTable from '@/components/SortableTable'
import orderBy from 'lodash/orderBy'

export default {
  components: {
    MarketsTickersListItem,
    SortableTable
  },
  props: {
    currentTicker: {
      type: String,
      default: 'USD'
    },
    items: {
      type: Array,
      default() {
        return () => []
      }
    },
    expandMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sortField: {
        field: 'ticker',
        type: 'asc'
      },
      activeFieldIndex: 0,
      marketsField: {
        small: [
          { title: 'Pair', field: 'ticker', align: 'center' },
          { title: 'Price, USD', field: 'priceUsd1', align: 'right' },
          { title: 'Vol, USD', field: 'volUsd', align: 'right' },
          { title: '24h', field: 'change2', align: 'center' }
        ],
        large: [
          { title: 'Name', field: 'ticker', align: 'center' },
          { title: 'Volume, USD', field: 'volUsd', align: 'right' },
          { title: 'Price', field: 'priceUsd1', align: 'right' },
          { title: '24h', field: 'change1', align: 'center' },
          { title: '7d', field: 'change2', align: 'center' },
          { title: 'Market, USD', field: 'marketcap', align: 'left' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      favouritesItems: 'markets/getFavouritesList'
    }),

    fields() {
      return this.expandMode ? this.marketsField.large : this.marketsField.small
    },
    sortedItems() {
      return orderBy(this.items.slice(0), this.sortField.field, this.sortField.type)
    }
  },
  methods: {
    ...mapActions('markets', ['toggleFavourite']),

    changeFavourite({ item }) {
      const cacheItems = Object.assign({}, this.favouritesItems)

      if (cacheItems[item.curr] && cacheItems[item.curr].includes(item.ticker)) {
        cacheItems[item.curr] = cacheItems[item.curr].filter(elem => elem !== item.ticker)
      } else {
        if (!cacheItems[item.curr]) cacheItems[item.curr] = []
        cacheItems[item.curr].push(item.ticker)
      }
      this.toggleFavourite({ newFavourites: cacheItems })
    },
    isFavourite(item) {
      if (this.currentTicker === 'favourites') return true
      return this.favouritesItems[this.currentTicker] && this.favouritesItems[this.currentTicker].includes(item.ticker)
    }
  }
}
</script>

<style lang="scss">
  .tickers-list {
    margin-top: 0.8rem;
    margin-left: 0.4375rem;
    font-weight: config('fontWeights.semibold');

    .tickers-list-head {
      display: flex;
      box-sizing: border-box;
      padding: 0.4375rem;
    }
  }
</style>
