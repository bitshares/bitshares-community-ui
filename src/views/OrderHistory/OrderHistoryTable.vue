<template>
  <div class="order-history-table">
    <SortableTable
      :items="items"
      :headers="tableHeaders"
      :header-left-padding="0.7"
      :header-right-padding="1">

      <template slot-scope="{ sortedItems }">
        <OrderHistoryTableItem
          v-for="(item, index) in sortedItems"
          :key="index"
          :item="item"
        />
      </template>
    </SortableTable>
  </div>
</template>
<script>
import SortableTable from '@/components/SortableTable'
import OrderHistoryTableItem from './OrderHistoryTableItem'

export default {
  components: {
    SortableTable,
    OrderHistoryTableItem
  },
  props: {
    tableHeaders: {
      type: Array,
      default() {
        return []
      }
    },
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>
