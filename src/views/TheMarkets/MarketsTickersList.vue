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
          :is-favourite="!!favourites[ticker.id]"
          @change="changeFavourite"
        />
      </template>
    </SortableTable>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    favourites: {
      type: Object,
      default() {
        return () => {}
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
    fields() {
      return this.expandMode ? this.marketsField.large : this.marketsField.small
    },
    sortedItems() {
      if (this.currentTicker === 'favourites') {
        return orderBy(
          this.items.filter(item => this.favourites[item.id]), this.sortField.field, this.sortField.type
        )
      }
      return orderBy(this.items.slice(0), this.sortField.field, this.sortField.type)
    }
  },
  methods: {
    ...mapActions('markets', ['toggleFavourite']),

    changeFavourite({ id }) {
      this.toggleFavourite({ id })
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
