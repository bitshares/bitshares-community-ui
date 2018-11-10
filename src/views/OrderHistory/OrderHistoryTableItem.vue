<template>
  <div
    :class="{
      'order-history-table-item--buy': item.order === 'buy',
      'order-history-table-item--sell': item.order === 'sell',
      'order-history-table-item--last': isLast
    }"
    class="order-history-table-item"
  >
    <div class="order-history-table-row">
      <div class="table-item">
        <div class="table-item-base">{{ item.payAssetSymbol }}</div>
        <div class="table-item--ticker">/{{ item.receiveAssetSymbol }}</div>
      </div>
      <div class="table-item">
        <div class="table-item-base">{{ price }}</div>
        <div class="table-item--ticker">{{ item.receiveAssetSymbol }}</div>
      </div>
      <div class="table-item">
        <div class="table-item-base">{{ get }}</div>
        <div class="table-item--ticker">{{ item.receiveAssetSymbol }}</div>
      </div>
      <div class="table-item">
        <div class="table-item-base">{{ spend }}</div>
        <div class="table-item--ticker">{{ item.payAssetSymbol }}</div>
      </div>
      <!-- <div class="table-item--dates">
        <div class="table-item-date">{{ dateOpen }}</div>
        <div class="table-item-date">{{ timeOpen }}</div>
      </div> -->
      <div class="table-item--dates">
        <div class="table-item-date">{{ dateClose }}</div>
        <div class="table-item-date">{{ timeClose }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { format } from 'date-fns'
// import { getVolumeFormat } from '@/helpers/utils'

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
    return {}
  },
  computed: {
    dateOpen() {
      return format(this.item.dateOpen, 'DD/MM')
    },
    dateClose() {
      return format(this.item.dateClose, 'DD/MM')
    },
    timeOpen() {
      return format(this.item.dateOpen, 'HH:mm')
    },
    timeClose() {
      return format(this.item.dateClose, 'HH:mm')
    },
    price() {
      return this.item.price
    },
    get() {
      return this.item.get
    },
    spend() {
      return this.item.spend
    }
  }
}
</script>
<style lang="scss">
  .order-history-table-row {
    color: config('colors.white');
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    height: 3.9375rem;
  }
  .order-history-table-item {
    color: config('colors.text-primary');
    margin: 0.1250rem 0 0.1250rem 0.1250rem;
    
    grid-auto-flow: column;
    grid-column: 1 / 2;
    grid-row: 1;

    transition: background-color 0.15s ease;
    padding: 0 1.5rem 0 1rem;

    &--buy {
      border-left: 7px solid config('colors.buy');
    }
    &--sell {
      border-left: 7px solid config('colors.sell');
    }
    &--last {
      position: relative;
      z-index: 100;
    }
  }
  .order-history-table-row .table-item {
    padding-right: 0.15rem;
    align-self: center;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: config('textSizes.sm');
    &--ticker {
      margin-top: 0.1rem;
      color: config('colors.inactive');
      font-size: config('textSizes.xs-sm');
    }
    &--dates {
      align-self: center;
      text-align: right;
      font-size: config('textSizes.xs-sm');
    }
  }
  .table-item > .table-item-base {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
