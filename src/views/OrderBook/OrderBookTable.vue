<template>
  <div class="order-book__table">
    <div class="order-book__column-title">{{ title }}</div>
    <OrderBookTableItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
    />
  </div>
</template>
<script>
import OrderBookTableItem from './OrderBookTableItem'

export default {
  components: {
    OrderBookTableItem
  },
  props: {
    title: {
      type: String,
      default: ''
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
<style lang="scss">
  .order-book__table {
    flex: 1;
    font-family: config('fonts.gotham');
    text-align: center;
  }
  .order-book__column-title {
    margin-bottom: 0.9375rem;
  }
</style>
