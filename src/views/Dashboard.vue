<template>
  <div class="dashboard">
    <div class="dashboard">
      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          class="lg:w-1/2"
          title="account">
          <div slot="header">
            <AccountHeader />
          </div>
          <div slot="body">
            <Portfolio />
          </div>
        </Card>

        <Card
          class="lg:w-1/2 scrollable"
          title="Transactions">
          <div slot="body">
            <TransactionsHistory/>
          </div>
        </Card>
      </div>

      <div class="flex flex-col lg:flex-row mb-2">
        <card
          :expanded="true"
          class="lg:w-1/3"
          title="markets">
          <div
            slot="body"
            class="uppercase">
            <TheMarkets
              :expand-mode="false"
            />
          </div>
        </Card>

        <Card
          class="lg:w-2/3 disabled"
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
import Portfolio from '@/views/Account/Portfolio.vue'
import AccountHeader from '@/views/Account/AccountHeader.vue'

import Card from '@/components/Card'
import TransactionsHistory from '@/views/TransactionsHistory/'
import TheMarkets from '@/views/TheMarkets/'

export default {
  name: 'Dashboard',
  components: { Portfolio, AccountHeader, Card, TransactionsHistory, TheMarkets }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
