<template>
  <div
    :class="{'markets--expanded': expandMode}"
    class="markets"
  >
    <div class="markets__header">
      <div
        class="markets__expanded"
        @click="showModal = true"
      />
      <MarketsModal
        v-if="showModal"
        @close="showModal = false"
      >
        <div slot="body">
          <TheMarkets :expand-mode="true"/>
        </div>
      </MarketsModal>
      <div class="tickers-sidebar">
        <Tabs
          :tabs="['USD', 'BTC', 'ETH', 'CNY', 'BTS']"
          :currency-mode="true"
          @change="onTickerChange"
        />
      </div>
      <div class="tickers-search">
        <SearchInput
          :hint="'Search'"
          :on-change="onSearch"
        />
      </div>
    </div>
    <MarketsTickersList
      :items="foundItems"
      :expand-mode="expandMode"
      :current-ticker="currentTicker"
    />
  </div>
</template>
<script>
import { sortByField } from '@/helpers/utils'
import Tabs from '@/components/Tabs'
import SearchInput from '@/components/SearchInput/'
import MarketsModal from '@/components/Modal'
import TheMarkets from '@/views/TheMarkets'
import MarketsTickersList from './MarketsTickersList'

import { mapGetters } from 'vuex'

export default {
  name: 'TheMarkets',
  components: {
    Tabs,
    SearchInput,
    MarketsModal,
    MarketsTickersList,
    TheMarkets
  },
  props: {
    expandMode: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      currentTicker: 'USD',
      searchValue: '',
      showModal: false
    }
  },
  computed: {
    ...mapGetters('markets', ['markets']),

    tickerItems() {
      return this.markets[this.currentTicker].slice().sort(sortByField('ticker'))
    },
    foundItems() {
      if (!this.searchValue) return this.tickerItems
      return this.tickerItems.filter(item => item.ticker.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1)
    }
  },
  methods: {
    onSearch({ value }) {
      this.searchValue = value
    },
    onTickerChange(tickerValue) {
      this.currentTicker = tickerValue
    }
  }
}
</script>
<style lang="scss" scoped>
  .markets__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #0A0A0A;

    .markets__expanded {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid #7a7675;
      position: absolute;
      left: 18px;
      top: 5px;
      z-index: 100;
    }
    .tickers-search {
      margin-top: -22px;
      position: absolute;
      right: 10px;
      z-index: 10;
    }
  }
  .markets--expanded {
    .tickers-search {
      margin-top: 8px;
    }
  }
</style>
