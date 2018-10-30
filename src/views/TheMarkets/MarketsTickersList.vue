<template>
  <div
    class="tickers-list"
    :class="{'tickers-list_expanded': expandMode}"
  >
    <div class="tickers-list-head">
      <div
        v-for="(field, index) in fields"
        :key="index"
        :class="getFieldClasses({ classes: field.classes, fieldIndex: index })"
        @click="changeSortField({ field: field.sortField, index })"
      >
        <SortableHeaderItem
          :show-icon="activeFieldIndex === index"
          :sort="sortType"
          :title="getFieldTitle(field.title)"
          :class="{'_mt-2': expandMode }"
        />
      </div>
    </div>

    <MarketsTickersListItem
      v-for="(ticker, index) in sortedList"
      :key="index"
      :item="ticker"
      :current-ticker="currentTicker"
      :expand-mode="expandMode"
      :is-favourite="!!favourites[ticker.id]"
      @change="changeFavourite"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MarketsTickersListItem from './MarketsTickersListItem'
import SortableHeaderItem from '@/components/SortableHeaderItem'
import orderBy from 'lodash/orderBy'

export default {
  components: {
    MarketsTickersListItem,
    SortableHeaderItem
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
      sortField: 'ticker',
      sortType: 'asc',
      activeFieldIndex: 0,
      marketsField: {
        small: [
          { title: 'Name/Vol, {currentTicker}', sortField: 'ticker', classes: ['tickers-list__field'] },
          { title: 'Price, {currentTicker}', sortField: 'priceUsd1', classes: ['tickers-list__field _flex05'] },
          { title: '24h%/7d%', sortField: 'change1', classes: ['tickers-list__field _alignRight'] }
        ],
        large: [
          { title: 'Name', sortField: 'ticker', classes: ['tickers-list__field pl-31'] },
          { title: 'Volume, {currentTicker}', sortField: 'volUsd', classes: ['tickers-list__field'] },
          { title: 'Price', sortField: 'priceUsd1', classes: ['tickers-list__field _flex05'] },
          { title: '24h%', sortField: 'change1', classes: ['tickers-list__field _flex05 _alignRight'] },
          { title: '7d%', sortField: 'change2', classes: ['tickers-list__field _flex05 _alignRight'] },
          { title: 'Market Cap, {currentTicker}', sortField: 'marketcap', classes: ['tickers-list__field _alignRight'] }
        ]
      }
    }
  },
  computed: {
    fields() {
      return this.expandMode ? this.marketsField.large : this.marketsField.small
    },
    sortedList() {
      if (this.currentTicker === 'favourites') {
        return orderBy(
          this.items.filter(item => this.favourites[item.id]), this.sortField, this.sortType
        )
      }
      return orderBy(this.items.slice(0), this.sortField, this.sortType)
    },
    currentOfTicker() {
      return this.currentTicker === 'favourites' ? 'USD' : this.currentTicker
    }
  },
  methods: {
    ...mapActions('markets', ['toggleFavourite']),

    changeSortField({ field, index }) {
      this.activeFieldIndex = index
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc'
      this.sortField = field
    },
    changeFavourite({ id }) {
      this.toggleFavourite({ id })
    },
    getFieldTitle(tmpl) {
      return tmpl.replace('{currentTicker}', this.currentOfTicker)
    },
    getFieldClasses({ classes, fieldIndex }) {
      return [
        classes.concat({
          '_field-active': this.activeFieldIndex === fieldIndex
        })
      ]
    }
  }
}
</script>

<style lang="scss">
  .tickers-list {
    margin-top: 0.5rem;
    font-weight: config('fontWeights.semibold');

    .header-item {
      position: initial;
      display: inline;
    }
    .header-item__arrows {
      position: initial;
      display: inline-block;
    }

    ._alignRight {
      text-align: right;
    }

    ._field-active {
      color: config('colors.white') !important;
    }
    ._custom-positions {
      top: 0.0625rem;
      right: 0.25rem;
    }

    .tickers-list-head {
      display: flex;
      box-sizing: border-box;
      padding: 0.4375rem;

      .tickers-list__field {
        font-size: config('textSizes.xs-sm');
        flex: 1;
        color: config('colors.tab-header');
        font-family: config('fonts.gotham');

        &:hover {
          cursor: pointer;
        }
      }
      ._flex05 {
        flex: .7;
      }
      ._mt-2 {
        margin-top: 0.125rem;
      }
    }
    .tickers__favourite {
      display: inline-block;
      float: left;
      margin-right: 0.5rem;
      margin-top: 0.3125rem;
    }
    ._ml-21 {
      margin-left: 1.3125rem;
    }
  }
  .tickers-list_expanded {
    &.tickers-list {
      .tickers__favourite {
        margin-top: -0.125rem;
        margin-right: 0.9375rem;
      }
      .pl-31 {
        box-sizing: border-box;
        padding-left: 1.9375rem;
      }
      .tickers-list-head {
        .tickers-list__field {
          font-size: config('textSizes.sm')
        }
      }
    }
  }
</style>
