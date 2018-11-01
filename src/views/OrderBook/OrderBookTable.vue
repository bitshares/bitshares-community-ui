<template>
  <div
    :class="{
      'order-book__table--buy': tableType === 'buy',
      'order-book__table--sell': tableType === 'sell'
    }"
    class="order-book__table"
  >
    <div class="order-book__column-title">{{ title }}</div>

    <SortableTable
      :items="items"
      :headers="tableHeaders"
    >
      <template slot-scope="{ sortedItems }">
        <OrderBookTableItem
          v-for="(item, index) in sortedItems"
          :key="index"
          :mode="mode"
          :item="item"
          :align="align"
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
    }
  },
  data() {
    return {
      tableHeaders: [
        { title: 'Sum, BTC', field: 'sum', align: this.align },
        { title: '', field: 'price', align: this.align }
      ]
    }
  },
  computed: {
    tableType() {
      return this.title === 'Byuing' ? 'buy' : 'sell'
    }
  }
}
</script>
<style lang="scss">
  .order-book__table {
    flex: 1;
    font-family: config('fonts.gotham');

    &--buy {
      color: green;
    }
    &--sell {
      color: red;
    }
  }
  .order-book__column-title {
    margin-bottom: 0.9375rem;
  }
</style>
