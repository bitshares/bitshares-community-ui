<template>
  <div class="tickers-list">
    <!--small-->
    <div
      v-if="!expandMode"
      class="tickers-list-head"
    >
      <div
        v-for="(field, index) in marketsField.small"
        :key="index"
        :class="[field.classes.concat({'_field-active': activeFieldIndex === index})]"
        @click="changeSortField({ field: field.sortField, index })"
      >{{ getFieldTitle(field.title) }}
        <SortableHeaderItem
          v-if="activeFieldIndex === index"
          :sort="sortType"
        />
      </div>
    </div>
    <!--expand-->
    <div
      v-if="expandMode"
      class="tickers-list-head"
    >
      <div
        v-for="(field, index) in marketsField.large"
        :key="index"
        :class="[field.classes.concat({'_field-active': activeFieldIndex === index})]"
        @click="changeSortField({ field: field.sortField, index })"
      >{{ getFieldTitle(field.title) }}
        <SortableHeaderItem
          v-if="activeFieldIndex === index"
          :sort="sortType"
          class="_mt-2"
        />
      </div>
    </div>
    <MarketsTickersListItem
      v-for="(ticker, index) in sortedList"
      :key="index"
      :item="ticker"
      :current-ticker="currentTicker"
      :expand-mode="expandMode"
      :on-change-favourite="changeFavourite"
      :is-favourite="!!favourites[ticker.id]"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      default() {
        return false
      }
    }
  },
  data() {
    return {
      sortField: 'ticker',
      sortType: 'asc',
      activeFieldIndex: 0
    }
  },
  computed: {
    ...mapGetters({
      marketsField: 'markets/getMarketsField'
    }),
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
    }
  }
}
</script>

<style lang="scss">
  .tickers-list {
    margin-top: 0.5rem;
    font-weight: 600;

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
        text-transform: none;
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
    .tickers-list-row {
      display: flex;
      box-sizing: border-box;
      padding: 0.4375rem;
      transition: ease-in-out 0.6s ease;

      &:hover {
        cursor: pointer;
        background: #131313;
      }

      ._tickerTitle {
        font-size: config('textSizes.xs');
      }
      ._currencyTitle {
        color: config('colors.white');
        font-size: config('textSizes.sm');
      }
      ._increase {
        color: config('colors.increase');
        opacity: 1;
      }
      ._drop {
        color: config('colors.drop');
        opacity: 1;
      }
      ._flex05 {
        flex: .7;
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
  .markets--expanded {
    .tickers-list {
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
