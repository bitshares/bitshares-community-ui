<template>
  <div
    :class="{'markets_expanded': expandMode}"
    class="markets"
  >
    <div class="markets__header">
      <div class="tickers-sidebar">
        <Tabs
          :tabs="['USD', 'OPEN.BTC', 'CNY', 'BTS']"
          :active="currentBase"
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
    <LoadingContainer :loading="showLoader">
      <MarketsList
        :items="filteredItems"
        :expand-mode="expandMode"
        :current-base="currentBase"
      />
    </LoadingContainer>
  </div>
</template>
<script>
import Tabs from '@/components/Tabs'
import LoadingContainer from '@/components/LoadingContainer'
import MarketsList from './MarketsList'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheMarkets',
  components: {
    Tabs,
    MarketsList,
    LoadingContainer
  },
  props: {
    expandMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      currentBase: 'marketsMonitor/getCurrentBase',
      list: 'marketsMonitor/getCurrentList',
      favourites: 'marketsMonitor/getFavouritesList',
      isFetching: 'marketsMonitor/isListFetching',
      searchStr: 'marketsMonitor/getSearchStr'
    }),
    showLoader() {
      if (this.favouritesMode) return this.isFetching
      return this.isFetching && !this.itemsList.length
    },
    favouritesMode() {
      return this.currentBase === 'favourites'
    },
    itemsList() {
      return this.favouritesMode ? this.favourites : this.list
    },
    filteredItems() {
      console.log(this.itemsList.filter(item => item.ticker.toLowerCase().includes(this.searchStr.toLowerCase())))
      return this.itemsList.filter(item => item.ticker.toLowerCase().includes(this.searchStr.toLowerCase()))
    }
  },
  methods: {
    ...mapActions('marketsMonitor', ['setCurrentBase']),

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
    // margin-top: 0.625rem;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    justify-content: space-between;
  }
</style>
