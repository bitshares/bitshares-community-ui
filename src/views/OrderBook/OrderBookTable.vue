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
      :header-left-padding="tableType === 'buy' ? 0.6 : 0.6"
      :header-right-padding="tableType === 'sell' ? 0.4 : 0.6"
      :default-sort="defaultSort"
    >
      <template slot-scope="{ sortedItems }">
        <OrderBookTableItem
          v-for="(item, index) in sortedItems"
          :key="index"
          :item="item"
          :align="align"
          :type="tableType"
          :max-sum="maxSum"
          :is-last="sortedItems.length - 1 === index"
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
      required: true
    },
    maxSum: {
      type: Number,
      default: 0
    },
    tableHeaders: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    tableType() {
      return this.title === 'Buying' ? 'buy' : 'sell'
    },
    defaultSort() {
      return {
        field: 'price',
        type: this.tableType === 'buy' ? 'desc' : 'asc'
      }
    }
  }
}
</script>
<style lang="scss">
  .order-book-table {
    flex: 1;
    width: 50%;
    display: flex;
    flex-direction: column;
    &--sell {
      .order-book__column-title {
        text-align: right;
      }
    }
  }
  .order-book__column-title {
    padding: 0 0.4rem 0 0.6rem;
    margin-bottom: 0.6rem;
    color: config('colors.text-primary');
    // margin-bottom: -0.9375rem;
  }
</style>
