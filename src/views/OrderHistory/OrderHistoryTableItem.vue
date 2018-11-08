<template>
  <div
    :class="{
      'order-history-table-item--buy': item.order === 'buy',
      'order-history-table-item--sell': item.order === 'sell'
    }"
    class="order-history-table-item"
  >
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
        <div class="table-item-date">{{ dateOpen }}</div>
        <div class="table-item-date">{{ timeOpen }}</div>
      </div>
      <div class="table-item--dates">
        <div class="table-item-date">{{ dateClose }}</div>
        <div class="table-item-date">{{ timeClose }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { format } from 'date-fns'

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
  },
  data() {
    return {
      format
    }
  },
  computed: {
    dateOpen() {
      return this.format(this.item.dateOpen, 'DD/MM')
    },
    dateClose() {
      return this.format(this.item.dateClose, 'DD/MM')
    },
    timeOpen() {
      return this.format(this.item.dateOpen, 'HH:mm')
    },
    timeClose() {
      return this.format(this.item.dateClose, 'HH:mm')
    }
  }
}
</script>
<style lang="scss">
  .order-history-table-row {
    color: config('colors.white');
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    height: 5.9375rem;

    &--last {
      position: relative;
      z-index: 10;
    }
  }
  .order-history-table-item {
    color: config('colors.text-primary');
    margin: 0.1250rem 0 0.1250rem 0.1250rem;

    grid-auto-flow: column;
    grid-column: 1 / 2;
    grid-row: 1;

    padding-left: 0;
    padding-right: 0;
    transition: background-color 0.15s ease;
    padding: 0 1.5rem 0 1rem;

    &--buy {
      border-left: 7px solid config('colors.buy');
    }
    &--sell {
      border-left: 7px solid config('colors.sell');
    }
  }
  .table-item {
    align-self: center;
    font-size: config('textSizes.lg');
    &--ticker {
      color: config('colors.inactive');
      font-size: config('textSizes.base');
    }
    &--dates {
      align-self: center;
      font-size: config('textSizes.sm');
    }
  }
</style>
