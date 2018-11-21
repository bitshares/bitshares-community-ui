<template>
  <div class="order-active-table">
    <SortableTable
      :items="items"
      :headers="tableHeaders"
      :header-left-padding="1.6"
      :header-right-padding="rightTablePadding"
      :default-sort="defaultSort"
      :large="expanded">

      <template slot-scope="{ sortedItems }">
        <OrderActiveTableItem
          v-for="(item, index) in sortedItems"
          :key="index"
          :item="item"
          :is-last="sortedItems.length - 1 === index"
          :expanded="expanded"
        />
      </template>
    </SortableTable>
  </div>
</template>
<script>
import SortableTable from '@/components/SortableTable'
import OrderActiveTableItem from './OrderActiveTableItem'
export default {
  components: {
    SortableTable,
    OrderActiveTableItem
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
        field: 'dateOpen',
        type: 'desc'
      }
    }
  },
  computed: {
    rightTablePadding() {
      if (this.expanded) {
        return 4
      }
      return 2
    }
  }
}
</script>
<style lang="scss">
  .order-active-table {
    height: 100%;
  }
</style>
