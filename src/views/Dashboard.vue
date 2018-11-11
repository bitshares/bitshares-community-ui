<template>
  <div class="dashboard">
    <div
      style="color: #fff; cursor:pointer; text-align:center; color:green; margin-bottom:15px;"
      @click="backupShow = !backupShow"
    >Backup
      <Modal v-if="backupShow">
        <Backup/>
      </Modal>
    </div>
    <div class="dashboard">
      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          :expandable="true"
          class="lg:w-1/3"
          title="account"
        >
          <AccountHeader slot="header"/>
          <AccountHeader slot="modal-header"/>
          <Portfolio slot="body"/>
          <Portfolio slot="modal"/>
        </Card>
        <Card
          class="lg:w-2/3 disabled"
          title="Graph"
        />
      </div>
      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          :expandable="true"
          class="lg:w-1/3"
          title="markets"
        >
          <MarketsSearch slot="header"/>
          <Markets slot="body"/>
          <MarketsSearch slot="modal-header"/>
          <Markets
            slot="modal"
            :expand-mode="true"/>
        </Card>
        <Card
          class="lg:w-1/3"
          title="order book">
          <OrderBook slot="body"/>
        </Card>
        <Card
          class="lg:w-1/3"
          title="My orders history">
          <OrderHistorySearch slot="header"/>
          <OrderHistory slot="body"/>
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
import Markets from '@/views/Markets/Markets'
import MarketsSearch from '@/views/Markets/MarketsSearch'
import OrderHistory from '@/views/OrderHistory/OrderHistory'
import OrderHistorySearch from '@/views/OrderHistory/OrderHistorySearch'
import Backup from '@/views/Backup/Backup'
import Modal from '@/components/Modal/Modal'

export default {
  name: 'Dashboard',
  components: {
    Portfolio,
    AccountHeader,
    Card,
    TransactionsHistory,
    Markets,
    MarketsSearch,
    OrderBook,
    OrderBookLastPrice,
    OrderHistory,
    OrderHistorySearch,
    Backup,
    Modal
  },
  data() {
    return {
      backupShow: false
    }
  }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
