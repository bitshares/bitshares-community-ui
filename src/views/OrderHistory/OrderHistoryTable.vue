<template>
  <div class="order-history-table">
    <SortableTable
      :items="items"
      :headers="tableHeaders"
      :header-left-padding="headerLeftPadding"
      :header-right-padding="1.5"
      :default-sort="defaultSort"
      :large="expanded">

      <template slot-scope="{ sortedItems }">
        <OrderHistoryTableItem
          v-for="(item, index) in sortedItems"
          :key="index"
          :item="item"
          :expanded="expanded"
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
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultSort: {
        field: 'dateClose',
        type: 'desc'
      }
    }
  },
  computed: {
    headerLeftPadding() {
      return this.expanded ? 1.3 : 1
    }
  }
}
</script>
<style lang="scss">
  .order-history-table {
    height: 100%;
  }
  @media (max-width: 50rem) {
    .order-history-table {
      height: calc(100% - 3.125rem);
    }
  }
</style>
