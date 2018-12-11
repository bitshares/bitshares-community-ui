<template>
  <div
    :class="{ 'w-220': expandMode }"
    class="order-history pt-3 lg:pt-0"
  >
    <LoadingContainer :loading="isFetching">
      <OrderHistoryTable
        :table-headers="expandMode ? tableHeaders : tableHeadersMini"
        :items="filteredItems"
        :expanded="expandMode"
      />
    </LoadingContainer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LoadingContainer from '@/components/LoadingContainer'
import OrderHistoryTable from './OrderHistoryTable'

export default {
  name: 'OrderHistory',
  components: {
    OrderHistoryTable,
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
      tableHeaders: [
        { title: 'Pair', field: 'payAssetSymbol', align: 'left' },
        { title: this.expandMode ? 'Avg./Price' : 'Price', field: 'price', align: 'left' },
        { title: 'Get', field: 'get', align: 'left' },
        { title: 'Spend', field: 'spend', align: 'left' },
        // { title: 'Open', field: 'dateOpen', align: 'right' },
        { title: 'Closed', field: 'dateClose', align: 'right' }
      ],
      tableHeadersMini: [
        { title: 'Pair', field: 'payAssetSymbol', align: 'left' },
        { title: 'Avg./Price', field: 'price', align: 'left' },
        { title: 'Filled/Date', field: 'filled', align: 'right' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      items: 'orderHistory/getHistoryList',
      searchStr: 'orderHistory/getSearchStr',
      isFetching: 'operations/isFetching'
    }),
    filteredItems() {
      if (!this.items) {
        return []
      }
      const search = this.searchStr.toLowerCase()
      return this.items.filter(item => {
        return item.payAssetSymbol.toLowerCase().includes(search) ||
          item.receiveAssetSymbol.toLowerCase().includes(search)
      })
    }
  },
  mounted() {
    if (!this.expandMode) {
      this.tableHeaders = this.tableHeaders.filter(field => !field.expanded)
    }
  }
}
</script>
<style lang="scss">
  .order-history {
    position: relative;
    height: 100%;
  }
</style>
