<template>
  <div class="order-history-table">
    <SortableTable
      :headers="tableHeaders"
      :header-left-padding="0.7"
      :header-right-padding="1"
    />
  </div>
</template>
<script>
import SortableTable from '@/components/SortableTable'

export default {
  components: {
    SortableTable
  },
  props: {
    tableHeaders: {
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
