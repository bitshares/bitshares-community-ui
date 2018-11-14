<template>
  <div class="order-history pt-3 lg:pt-0">
    <LoadingContainer :loading="isFetching || !items.length">
      <OrderHistoryTable
        :table-headers="tableHeaders"
        :items="filteredItems"
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
  data() {
    return {
      tableHeaders: [
        { title: 'Pair', field: 'payAssetSymbol', align: 'left' },
        { title: 'Price', field: 'price', align: 'left' },
        { title: 'Get', field: 'get', align: 'left' },
        { title: 'Spend', field: 'spend', align: 'left' },
        // { title: 'Open', field: 'dateOpen', align: 'left' },
        { title: 'Closed', field: 'dateClose', align: 'right' }
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
      const search = this.searchStr.toLowerCase()
      return this.items.filter(item => {
        return item.payAssetSymbol.toLowerCase().includes(search) ||
          item.receiveAssetSymbol.toLowerCase().includes(search)
      })
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
