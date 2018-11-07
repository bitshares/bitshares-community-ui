<template>
  <div class="order-history-table-item">
    <div class="order-history-table-row">
      <div class="order-history-table-item">{{ item.base }}</div>
      <div class="order-history-table-item">{{ item.price }}</div>
      <div class="order-history-table-item">{{ item.ticker }}</div>
      <div class="order-history-table-item">{{ item.dateOpen }}</div>
      <div class="order-history-table-item">{{ item.dateTime }}</div>
      <div class="order-history-table-item">{{ item.get }}</div>
      <div class="order-history-table-item">{{ item.spend }}</div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="scss">
  .order-history-table-row {
    display: flex;
    color: config('colors.white');
  }
  .order-history-table-item {
    flex: 1;
  }
</style>
