<template>
  <div class="order-history">
    <OrderHistoryTable
      :table-headers="tableHeaders"
      :items="historyItems"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import OrderHistoryTable from './OrderHistoryTable'

export default {
  name: 'OrderHistory',
  components: {
    OrderHistoryTable
  },
  data() {
    return {
      tableHeaders: [
        { title: 'Pair', field: 'base', align: 'left' },
        { title: 'Price', field: 'price', align: 'left' },
        { title: 'Get', field: 'get', align: 'left' },
        { title: 'Spend', field: 'spend', align: 'left' },
        { title: 'Open', field: 'dateOpen', align: 'left' },
        { title: 'Closed', field: 'dateClose', align: 'left' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      historyItems: 'orderHistory/getHistory'
    })
  }
}
</script>
<style lang="scss">
  .order-history {
    position: relative;
    height: 100%;
  }
</style>
