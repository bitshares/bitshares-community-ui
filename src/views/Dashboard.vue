<template>
  <div class="dashboard">
    <div class="dashboard">
      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          class="lg:w-1/2"
          title="account">
          <AccountHeader slot="header"/>
          <AccountHeader slot="modal-header"/>
          <Portfolio slot="body"/>
          <Portfolio slot="modal"/>
        </Card>

        <!-- <Card
          class="lg:w-2/3 scrollable"
          title="Transactions">
          <div slot="body">
            <TransactionsHistory/>
          </div>
        </Card> -->

        <Card
          :expanded="true"
          class="lg:w-1/2"
          title="markets">
          <Markets slot="body"/>
          <Markets
            slot="modal"
            :expand-mode="true"/>
        </Card>
      </div>

      <!-- <div class="flex flex-col lg:flex-row mb-2">

        <Card
          class="lg:w-2/3"
          title="order book">
          <div slot="header">
            <OrderBookLastPrice/>
          </div>
          <div slot="body">
            <OrderBook/>
          </div>
        </Card>
      </div> -->

    </div>
  </div>
</template>

<script>
import Portfolio from '@/views/Account/Portfolio.vue'
import AccountHeader from '@/views/Account/AccountHeader.vue'
import OrderBook from '@/views/OrderBook/OrderBook'
import OrderBookLastPrice from '@/views/OrderBook/OrderBookLastPrice'

// import MarketsModal from '@/components/Modal'

import Card from '@/components/Card'
import TransactionsHistory from '@/views/TransactionsHistory/'
import Markets from '@/views/Markets/Markets'

export default {
  name: 'Dashboard',
  components: {
    Portfolio,
    AccountHeader,
    Card,
    TransactionsHistory,
    Markets,
    // MarketsModal,
    OrderBook,
    OrderBookLastPrice
  },
  data() {
    return {
      expanded: true,
      showModal: false
    }
  }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
