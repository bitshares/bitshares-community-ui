<template>
  <div class="dashboard">
    <div class="dashboard">
      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          class="lg:w-1/2"
          title="account">
          <AccountHeader slot="header"/>
          <Portfolio slot="body"/>
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
          <MarketsSearch slot="header"/>
          <Markets
            slot="body"
            :expand-mode="false"
          />
        </Card>
      </div>

      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          class="lg:w-1/2"
          title="order book">
          <div slot="body">
            <OrderBook/>
          </div>
        </Card>
      </div>

    </div>
  </div>
</template>

<script>
import Portfolio from '@/views/Account/Portfolio.vue'
import AccountHeader from '@/views/Account/AccountHeader.vue'
import OrderBook from '@/views/OrderBook/OrderBook'

// import MarketsModal from '@/components/Modal'

import Card from '@/components/Card'
import TransactionsHistory from '@/views/TransactionsHistory/'
import Markets from '@/views/Markets/Markets'
import MarketsSearch from '@/views/Markets/MarketsSearch'

export default {
  name: 'Dashboard',
  components: {
    Portfolio,
    AccountHeader,
    Card,
    TransactionsHistory,
    Markets,
    MarketsSearch,
    OrderBook
  }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
