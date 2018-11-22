<template>
  <div class="new-order">
    <NewOrderTabs
      :current-base="currentBase"
    />
    <NewOrderPrice
      :trade-item="tradeData.buy"
      order-type="buy"
    />
    <NewOrderPrice
      :trade-item="tradeData.sell"
      order-type="sell"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NewOrderTabs from './NewOrderTabs'
import NewOrderPrice from './NewOrderPrice'

export default {
  components: {
    NewOrderTabs,
    NewOrderPrice
  },
  data() {
    return {
      activeTab: {
        title: 'buy'
      }
    }
  },
  computed: {
    ...mapGetters({
      currentBase: 'newOrder/getCurrentBase',
      tradeData: 'newOrder/getTradeData'
    })
  }
}
</script>
