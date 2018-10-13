<template>
  <div class="dashboard">
    dashboard!
    <div class="dashboard flex flex-col lg:flex-row">

      <Card
        class="lg:w-1/3"
        title="account">
        <div slot="body"/>
      </Card>

      <Card
        class="lg:w-1/3 disabled"
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
      
      <Card
        :title="'portfolio'"
        class="lg:w-1/3"
      >
        <div slot="header">
          <PortfolioHeader />
        </div>
        <div slot="body">
          <Portfolio />
        </div>
      </Card>
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
  components: { Portfolio, PortfolioHeader, Card, TransactionHistory }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
  .scrollable {
    overflow: auto;
    overflow-y: scroll;
  }
</style>
