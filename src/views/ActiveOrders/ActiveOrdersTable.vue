<template>
  <div class="active-orders-table">
    <SortableTable
      :items="items"
      :headers="tableHeaders"
      :header-left-padding="headerLeftPadding"
      :header-right-padding="headerRightPadding"
      :default-sort="defaultSort"
      :large="expanded">

      <template slot-scope="{ sortedItems }">
        <ActiveOrdersTableItem
          v-for="(item, index) in sortedItems"
          :key="index"
          :index="index"
          :item="item"
          :expanded="expanded"
        />
      </template>
    </SortableTable>
  </div>
</template>
<script>
import SortableTable from '@/components/SortableTable'
import ActiveOrdersTableItem from './ActiveOrdersTableItem'
export default {
  components: {
    SortableTable,
    ActiveOrdersTableItem
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
      required: true
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultSort: {
        field: 'payAssetSymbol',
        type: 'desc'
      }
    }
  },
  computed: {
    headerRightPadding() {
      return this.expanded ? 3.2 : 1.7
    },
    headerLeftPadding() {
      return this.expanded ? 1.3 : 1
    }
  }
}
</script>
<style lang="scss">
  .active-orders-table {
    height: 92%;
  }
</style>
