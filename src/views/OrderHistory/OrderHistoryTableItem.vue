<template>
  <div class="order-history-table-item">
    <div
      :class="{'order-history-table-row--last': isLast }"
      class="order-history-table-row"
    >
      <div class="order-history-table-item--column">
        <div class="table-item-base">{{ item.base }}</div>
        <div class="table-item">/{{ item.ticker }}</div>
      </div>
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
    color: config('colors.text-primary');

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-flow: column;
    grid-column: 1 / 2;
    grid-row: 1;
    align-content: center;

    height: 5.9375rem;
    padding-left: 0;
    padding-right: 0;
    transition: background-color 0.15s ease;
    padding: config('padding.grid-table') 1.5rem config('padding.grid-table') 1rem;
  }
  .table-item {
    color: config('colors.inactive');
  }
</style>
