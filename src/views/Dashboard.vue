<template>
  <div class="dashboard">
    <div class="dashboard">
      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          class="lg:w-1/3"
          title="account">
          <div slot="header">
            <AccountHeader />
          </div>
          <div slot="body">
            <Portfolio />
          </div>
        </Card>

        <Card
          class="lg:w-2/3 scrollable"
          title="Transactions">
          <div slot="body">
            <TransactionsHistory/>
          </div>
        </Card>
      </div>

      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          class="lg:w-2/3 disabled"
          title="markets">
          <div
            slot="body"
            class="uppercase">
            under construction
          </div>
        </Card>

        <Card
          class="lg:w-1/3"
          title="order book">
          <div slot="header">
            <OrderBookLastPrice/>
          </div>
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
import OrderBookLastPrice from '@/views/OrderBook/OrderBookLastPrice'

import Card from '@/components/Card'
import TransactionsHistory from '@/views/TransactionsHistory/'

export default {
  name: 'Dashboard',
  components: { Portfolio, AccountHeader, Card, TransactionsHistory, OrderBook, OrderBookLastPrice }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
