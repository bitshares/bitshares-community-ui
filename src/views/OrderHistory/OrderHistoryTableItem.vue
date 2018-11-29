<template>
  <div
    :class="{
      'order-history-table-item--buy': item.order === 'buy',
      'order-history-table-item--sell': item.order === 'sell',
      'order-history-table-item--expanded': expanded
    }"
    class="order-history-table-item"
  >
    <div
      v-if="!expanded"
      class="order-history-table-row"
    >
      <div class="table-item">
        <TwoLineItem
          :top="item.payAssetSymbol"
          :bottom="item.receiveAssetSymbol"
        />
      </div>
      <div class="table-item">
        <TwoLineItem
          :top="avg"
          :bottom="price"
        />
      </div>
      <div class="table-item text-right">
        <TwoLineItem
          :top="item.order === 'buy' ? get : spend"
          :bottom="fullCloseTitle"
        />
      </div>
    </div>
    <div
      v-if="expanded"
      :class="{'order-history-table-row--expanded': expanded}"
      class="order-history-table-row"
    >
      <div class="table-item">
        <TwoLineItem
          :top="item.payAssetSymbol"
          :bottom="item.receiveAssetSymbol"
          :expanded="expanded"
        />
      </div>
      <div class="table-item">
        <TwoLineItem
          :top="avg"
          :bottom="price"
          :expanded="expanded"
        />
      </div>
      <div class="table-item">
        <TwoLineItem
          :top="get"
          :bottom="item.receiveAssetSymbol"
          :expanded="expanded"
        />
      </div>
      <div class="table-item">
        <TwoLineItem
          :top="spend"
          :bottom="item.payAssetSymbol"
          :expanded="expanded"
        />
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
import { getFloatCurrency } from '@/helpers/utils'
import TwoLineItem from '@/components/TwoLineItem'

export default {
  components: {
    TwoLineItem
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    expanded: {
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
    fullCloseTitle() {
      return `${this.dateClose} ${this.timeClose}`
    },
    price() {
      return getFloatCurrency(this.item.price)
    },
    avg() {
      return getFloatCurrency(this.item.avg)
    },
    get() {
      return getFloatCurrency(this.item.get)
    },
    spend() {
      return getFloatCurrency(this.item.spend)
    }
  }
}
</script>
<style lang="scss">
  .order-history-table-row {
    color: config('colors.primary');
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 3.9375rem;
    margin-left: -0.15rem;

  &.order-history-table-row--expanded {
    grid-template-columns: repeat(6, 1fr);

    .table-item--dates {
      color: config('colors.inactive');
      .table-item-date {
        font-size: config('textSizes.base');
      }
    }
  }
  }
  .order-history-table-item {
    &:last-child {
      position: relative;
      z-index: 100;
    }
    color: config('colors.text-primary');
    margin: 0.1250rem 0 0.1250rem 0.1250rem;

    grid-auto-flow: column;
    grid-column: 1 / 2;
    grid-row: 1;

    transition: background-color 0.15s ease;
    padding: 0 1.5rem 0 .8rem;
    &--expanded {
      padding-left: 1rem;
    }
    &:hover {
      position: relative;
      z-index: 2;
      background: #131313;
    }

    &--buy {
      border-left: .3125rem solid config('colors.buy');
    }
    &--sell {
      border-left: .3125rem solid config('colors.sell');
    }
  }
  .order-history-table-row .table-item {
    padding-top: 0.6rem;
    overflow: hidden;
    word-wrap: break-word;
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
</style>
