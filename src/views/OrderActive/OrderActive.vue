<template>
  <div class="order-active pt-3 lg:pt-0">
    <LoadingContainer :loading="isFetching">
      <OrderActiveTable
        :table-headers="expandMode ? tableHeadersActive : tableHeadersActiveMini"
        :items="filteredItems"
        :expanded="expandMode"
      />
    </LoadingContainer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LoadingContainer from '@/components/LoadingContainer'
import OrderActiveTable from './OrderActiveTable'
export default {
  name: 'OrderActive',
  components: {
    OrderActiveTable,
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
      tableHeadersActive: [
        { title: 'Pair', field: 'payAssetSymbol', align: 'left' },
        { title: this.expandMode ? 'Avg./Price' : 'Price', field: 'price', align: 'left' },
        { title: 'Get', field: 'get', align: 'left' },
        { title: 'Spend', field: 'spend', align: 'left' },
        { title: 'Filled', field: 'filled', align: 'right', expanded: true },
        { title: 'Open', field: 'dateOpen', align: 'right' }
      ],
      tableHeadersActiveMini: [
        { title: 'Pair', field: 'payAssetSymbol', align: 'left' },
        { title: 'Avg./Price', field: 'price', align: 'left' },
        { title: 'Vol./Filled', field: 'filled', align: 'right' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      items: 'orderActive/getHistoryList',
      searchStr: 'orderActive/getSearchStr',
      isFetching: 'operations/isFetching'
    }),
    filteredItems() {
      const search = this.searchStr.toLowerCase()
      return this.items.filter(item => {
        return item.payAssetSymbol.toLowerCase().includes(search) ||
          item.receiveAssetSymbol.toLowerCase().includes(search)
      })
    }
  },
  mounted() {
    if (!this.expandMode) {
      this.tableHeadersActive = this.tableHeadersActive.filter(field => !field.expanded)
    }
  }
}
</script>
<style lang="scss">
  .order-active {
    position: relative;
    height: 100%;
  }
</style>
