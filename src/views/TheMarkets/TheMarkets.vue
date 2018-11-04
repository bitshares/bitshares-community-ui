<template>
  <div
    :class="{'markets_expanded': expandMode}"
    class="markets"
  >
    <div class="markets__header">
      <div class="tickers-sidebar">
        <Tabs
          :tabs="['USD', 'OPEN.BTC', 'CNY', 'BTS']"
          :currency-mode="true"
          @change="handleBaseChange"
        />
      </div>
      <!-- <div class="search-wrapper">
        <div class="tickers-search">
          <SearchInput
            hint="Search"
            v-model="searchValue"
          />
        </div>
      </div> -->
    </div>
    <LoadingContainer :loading="isFetching && !list.length">
      <MarketsTickersList
        :items="filteredItems"
        :expand-mode="expandMode"
        :current-base="currentBase"
      />
    </LoadingContainer>
  </div>
</template>
<script>
import Tabs from '@/components/Tabs'
import SearchInput from '@/components/SearchInput'
import LoadingContainer from '@/components/LoadingContainer'
import MarketsTickersList from './MarketsTickersList'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheMarkets',
  components: {
    Tabs,
    SearchInput,
    MarketsTickersList,
    LoadingContainer
  },
  props: {
    expandMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters({
      currentBase: 'markets/getCurrentBase',
      markets: 'markets/getMarketsList',
      favourites: 'markets/getFavouritesList',
      list: 'markets/getCurrentList',
      isFetching: 'markets/isListFetching'
    }),
    favouritesMode() {
      return this.currentBase === 'favourites'
    },
    itemsList() {
      return this.favouritesMode ? this.favourites : this.list
    },
    filteredItems() {
      return this.itemsList.filter(item => item.ticker.toLowerCase().includes(this.searchValue.toLowerCase()))
    }
  },
  methods: {
    ...mapActions('markets', ['setCurrentBase']),

    handleBaseChange(base) {
      this.setCurrentBase(base)
    }
  }
}
</script>
<style lang="scss" scoped>
  .markets {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .markets__header {
    margin-top: 0.625rem;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    justify-content: space-between;
    background: #0A0A0A;

    .search-wrapper {
      margin-left: -5.9375rem;
    }
    .tickers-search {
      display: flex;
      justify-content: flex-end;
      margin-top: -1.375rem;
      background: config('colors.bg-base');
    }
  }
  .markets_expanded {
    .markets__header {
      .tickers-search {
        margin-top: 0.5rem;
        left: initial;
        right: 0.625rem;
        position: relative;
        background: transparent;
        z-index: 10;
        width: auto;
      }
    }
  }
</style>
