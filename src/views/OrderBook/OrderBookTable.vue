<template>
  <div
    :class="{
      'order-book-table--buy': tableType === 'buy',
      'order-book-table--sell': tableType === 'sell'
    }"
    class="order-book-table"
  >
    <div class="order-book__column-title">{{ title }}</div>

    <SortableTable
      :items="items"
      :headers="tableHeaders"
      :type="tableType"
      :header-left-padding="tableType === 'buy' ? 0.6 : 0"
      :header-right-padding="tableType === 'sell' ? 0.6 : 0"
    >
      <template slot-scope="{ sortedItems }">
        <OrderBookTableItem
          v-for="(item, index) in sortedItems"
          :key="index"
          :item="item"
          :align="align"
          :type="tableType"
          :max-sum="maxSum"
        />
      </template>
    </SortableTable>
  </div>
</template>
<script>
import SortableTable from '@/components/SortableTable'
import OrderBookTableItem from './OrderBookTableItem'

export default {
  components: {
    SortableTable,
    OrderBookTableItem
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'left'
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    maxSum: {
      type: Number,
      default: 0
    },
    tableHeaders: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    tableType() {
      return this.title === 'Buying' ? 'buy' : 'sell'
    }
  }
}
</script>
<style lang="scss">
  .order-book-table {
    flex: 1;
    font-family: config('fonts.gotham');
    &--sell {
      .order-book__column-title {
        text-align: right;
      }
    }
  }
  .order-book__column-title {
    margin-bottom: 0.9375rem;
  }
</style>
