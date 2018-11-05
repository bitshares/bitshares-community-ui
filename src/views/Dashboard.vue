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
          <div
            slot="header"
            class="search-wrapper"
          >
            <div class="tickers-search">
              <SearchInput
                hint="Search"
                @input="changeSearchStr"
              />
            </div>
          </div>
          <!-- <div
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
                <Markets
                  slot="body"
                  :expand-mode="true"/>
              </MarketsModal>
            </div>
          </div> -->
          <Markets
            slot="body"
            :expand-mode="false"
          />
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
import { mapActions } from 'vuex'
import Portfolio from '@/views/Account/Portfolio.vue'
import AccountHeader from '@/views/Account/AccountHeader.vue'
import OrderBook from '@/views/OrderBook/OrderBook'
import OrderBookLastPrice from '@/views/OrderBook/OrderBookLastPrice'

// import MarketsModal from '@/components/Modal'

import Card from '@/components/Card'
import TransactionsHistory from '@/views/TransactionsHistory/'
import Markets from '@/views/Markets/Markets'
import SearchInput from '@/components/SearchInput'

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
    OrderBookLastPrice,
    SearchInput
  },
  data() {
    return {
      expanded: true,
      showModal: false
    }
  },
  methods: {
    ...mapActions('marketsMonitor', ['changeSearchStr'])
  }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
