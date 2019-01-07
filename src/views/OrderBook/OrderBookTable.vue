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
      :header-left-padding="tableType === 'buy' ? 1 : 0.6"
      :header-right-padding="tableType === 'sell' ? 1 : 0.6"
      :default-sort="defaultSort"
      :empty-area="true"
      :hide-hover-arrow="true"
    >
      <OrderBookLastPrice
        v-if="anchor"
        slot="row"
        type="row"
      />
      <template slot-scope="{ sortedItems }">
        <OrderBookTableItem
          v-for="(item, index) in sortedItems"
          :key="index"
          :item="item"
          :align="align"
          :type="tableType"
          :max-sum="maxSum"
          :is-last="sortedItems.length - 1 === index"
          @click.native="$emit('item-clicked', item)"
        />
      </template>
    </SortableTable>
  </div>
</template>
<script>
import SortableTable from '@/components/SortableTable'
import OrderBookLastPrice from './OrderBookLastPrice'
import OrderBookTableItem from './OrderBookTableItem'

export default {
  components: {
    SortableTable,
    OrderBookLastPrice,
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
    },
    anchor: {
      type: Boolean,
      default: false
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
    padding: 0 1rem;
    margin-bottom: 0.6rem;
    color: config('colors.text-primary');
    // margin-bottom: -0.9375rem;
  }
</style>
