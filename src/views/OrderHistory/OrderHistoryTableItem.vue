<template>
  <div class="order-history-table-item">
    <div
      :class="{'order-history-table-row--last': isLast }"
      class="order-history-table-row"
    >
      <div class="order-history-table-item">{{ item.base }}</div>
      <div class="order-history-table-item">{{ item.price }}</div>
      <div class="order-history-table-item">{{ item.ticker }}</div>
      <div class="order-history-table-item">{{ item.dateOpen }}</div>
      <div class="order-history-table-item">{{ item.dateClose }}</div>
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
    },
    isLast: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
  .order-history-table-row {
    display: flex;
    color: config('colors.white');

    &--last {
      position: relative;
      z-index: 10;
    }
  }
  .order-history-table-item {
    flex: 1;
  }
</style>
