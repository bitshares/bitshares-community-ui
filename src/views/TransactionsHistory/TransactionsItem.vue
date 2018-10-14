<template >
  <div class="operation-item">
    <TransactionsItemTransferInfo
      v-if="type === 'transfer'"
      :user-id="userId"
      :item="item"/>

    <TransactionsItemPlaceOrderInfo
      v-if="type === 'limit_order_create'"
      :item="item"/>

    <TransactionsItemFillOrderInfo
      v-if="type === 'fill_order'"
      :item="item"/>

    <TransactionsItemCancelOrderInfo
      v-if="type === 'limit_order_cancel'"
      :item="item"/>
    <div class="operation-item__date">{{ relativeTime }} ago </div>
  </div>
</template>

<script>
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import TransactionsItemTransferInfo from './TransactionsItemTransferInfo'
import TransactionsItemPlaceOrderInfo from './TransactionsItemPlaceOrderInfo'
import TransactionsItemFillOrderInfo from './TransactionsItemFillOrderInfo'
import TransactionsItemCancelOrderInfo from './TransactionsItemCancelOrderInfo'

export default {
  components: {
    TransactionsItemTransferInfo,
    TransactionsItemPlaceOrderInfo,
    TransactionsItemFillOrderInfo,
    TransactionsItemCancelOrderInfo
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    type() {
      return this.item.type
    },
    typeTitle() {
      switch (this.type) {
        case 'limit_order_create':
          return 'Place order'
        case 'fill_order':
          return 'Fill order'
        case 'limit_order_cancel':
          return 'Cancel order'
        case 'transfer':
          return 'Transfer'
        default:
          return this.type
      }
    },
    icon() {
      switch (this.type) {
        case 'limit_order_create':
          return 'assignment'
        case 'fill_order':
          return 'assignment_turned_in'
        case 'limit_order_cancel':
          return 'cancel_presentation'
        case 'transfer':
          return this.item.payload.from === this.userId
            ? 'arrow_forward'
            : 'arrow_back'
        default:
          return this.type
      }
    },
    relativeTime() {
      let time = distanceInWordsStrict(new Date(), this.item.date)
      time = time.replace('hours', 'h')
      time = time.replace('hour', 'h')
      time = time.replace('minutes', 'm')
      time = time.replace('minute', 'm')
      return time
    }
  }
}
</script>

<style>
.operation-item {
  @apply text-sm mb-1 font-gotham;
  display: flex;
  justify-content: space-between;
}
.operation-item__date {
  margin-left: 0.5rem;
  flex-shrink: 0;
  text-align: right;
  font-size: 12px;
  color: #9e9e9e;
}
</style>
