<template>
  <div class="active-orders pt-3 lg:pt-0">
    <LoadingContainer :loading="isFetching">
      <ActiveOrdersTable
        :table-headers="tableHeaders"
        :items="filteredItems"
        :expanded="expandMode"
      />
    </LoadingContainer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LoadingContainer from '@/components/LoadingContainer'
import ActiveOrdersTable from './ActiveOrdersTable'
export default {
  name: 'OrderActive',
  components: {
    ActiveOrdersTable,
    LoadingContainer
  },
  props: {
    expandMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      items: 'activeOrders/getActiveList',
      searchStr: 'activeOrders/getSearchStr',
      isFetching: 'activeOrders/isFetching'
    }),
    filteredItems() {
      const search = this.searchStr.toLowerCase()
      return this.items.filter(item => {
        return item.payAssetSymbol.toLowerCase().includes(search)
      })
    },
    tableHeaders() {
      if (this.expandMode) {
        return [
          { title: 'Pair', field: 'payAssetSymbol', align: 'left' },
          { title: this.expandMode ? 'Avg. / Price' : 'Price', field: 'price', align: 'left' },
          { title: 'Get', field: 'get', align: 'left' },
          { title: 'Spend', field: 'spend', align: 'left' },
          { title: 'Filled', field: 'filled', align: 'right', expanded: true },
          { title: 'Open', field: 'dateOpen', align: 'right' }
        ]
      }
      return [
        { title: 'Pair', field: 'payAssetSymbol', align: 'left' },
        { title: 'Avg./Price', field: 'price', align: 'left' },
        { title: 'Vol./Filled', field: 'filled', align: 'right' }
      ]
    }
  }
}
</script>
<style lang="scss">
  .active-orders {
    position: relative;
    height: 100%;
  }
</style>
