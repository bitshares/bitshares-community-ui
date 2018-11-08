<template>
  <div class="order-history-table-item">
    <div
      :class="{'order-history-table-row--last': isLast }"
      class="order-history-table-row"
    >
      <div class="table-item">
        <div class="table-item-base">{{ item.base }}</div>
        <div class="table-item--ticker">/{{ item.ticker }}</div>
      </div>
      <div class="table-item">
        <div class="table-item-base">{{ item.price }}</div>
        <div class="table-item--ticker">{{ item.ticker }}</div>
      </div>
      <div class="table-item">
        <div class="table-item-base">{{ item.get }}</div>
        <div class="table-item--ticker">{{ item.ticker }}</div>
      </div>
      <div class="table-item">
        <div class="table-item-base">{{ item.spend }}</div>
        <div class="table-item--ticker">{{ item.base }}</div>
      </div>
      <div class="table-item--dates">
        <div class="table-item-date">{{ '27/10' }}</div>
        <div class="table-item-date">{{ '10:12' }}</div>
      </div>
      <div class="table-item--dates">
        <div class="table-item-date">{{ '28/10' }}</div>
        <div class="table-item-date">{{ '11:08' }}</div>
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
    color: config('colors.white');
    display: grid;
    grid-template-columns: repeat(6, 1fr);

    &--last {
      position: relative;
      z-index: 10;
    }
  }
  .order-history-table-item {
    color: config('colors.text-primary');

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
    font-size: config('textSizes.lg');
    &--ticker {
      color: config('colors.inactive');
      font-size: config('textSizes.base');
    }
    &--dates {
      font-size: config('textSizes.sm');
    }
  }
</style>
