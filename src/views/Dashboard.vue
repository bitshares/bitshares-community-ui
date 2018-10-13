<template>
  <div class="dashboard">
    <div class="dashboard">
      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          class="lg:w-1/3"
          title="account">
          <div slot="header">
            <PortfolioHeader />
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
          class="lg:w-1/3 disabled"
          title="order book">
          <div
            slot="body"
            class="uppercase">
            under construction
          </div>
        </Card>
      </div>

    </div>
  </div>
</template>

<script>
import Portfolio from './Portfolio/Portfolio.vue'
import PortfolioHeader from './Portfolio/PortfolioHeader.vue'

import Card from '@/components/Card'
import TransactionsHistory from '@/views/TransactionsHistory/'

export default {
  name: 'Dashboard',
  components: { Portfolio, PortfolioHeader, Card, TransactionsHistory }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
