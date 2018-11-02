<template>
  <div class="dashboard">
    <div class="dashboard">
      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          class="lg:w-1/3"
          title="account">
          <AccountHeader slot="header"/>
          <Portfolio slot="body"/>
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
        <card
          :expanded="true"
          class="lg:w-1/3"
          title="markets">
          <div
            slot="modal"
          >
            <div v-if="expanded">
              <div
                class="card-expanded"
                @click="showModal = true"
              />
              <MarketsModal
                v-if="showModal"
                @close="showModal = false"
              >
                <TheMarkets
                  slot="body"
                  :expand-mode="true"/>
              </MarketsModal>
            </div>
          </div>
          <TheMarkets
            slot="body"
            :expand-mode="false"
          />
        </Card>

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
      </div>

    </div>
  </div>
</template>

<script>
import Portfolio from '@/views/Account/Portfolio.vue'
import AccountHeader from '@/views/Account/AccountHeader.vue'
import OrderBook from '@/views/OrderBook/OrderBook'
import OrderBookLastPrice from '@/views/OrderBook/OrderBookLastPrice'

import MarketsModal from '@/components/Modal'

import Card from '@/components/Card'
import TransactionsHistory from '@/views/TransactionsHistory/'
import TheMarkets from '@/views/TheMarkets/'

export default {
  name: 'Dashboard',
  components: {
    Portfolio,
    AccountHeader,
    Card,
    TransactionsHistory,
    TheMarkets,
    MarketsModal,
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
