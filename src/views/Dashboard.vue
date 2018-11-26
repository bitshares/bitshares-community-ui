<template>
  <div class="dashboard">
    <Modal
      v-if="backupFlag"
      @close="setBackupFlag(false)"
    >
      <Backup/>
    </Modal>
    <div class="dashboard hidden lg:block">
      <div class="flex flex-col lg:flex-row mb-card-margin">

        <Card
          :expandable="true"
          collapsible
          class="lg:w-1/3 lg:mr-card-margin"
          title="account"
        >
          <AccountHeader slot="header"/>
          <AccountHeader
            slot="modal-header"
            :large="true"/>
          <Portfolio slot="body"/>
          <Portfolio
            slot="modal"
            :expanded="true"/>
        </Card>
        <Card class="lg:w-1/3">
          <NewOrder slot="body"/>
        </Card>
        <Card
          collapsible
          class="lg:w-1/3 disabled"
          title="Graph"
        />

      </div>
      <div class="flex flex-col lg:flex-row mb-card-margin">

        <Card
          :expandable="true"
          :long="true"
          collapsible
          class="lg:w-1/3 lg:mr-card-margin"
          title="markets"
        >
          <MarketsSearch slot="header"/>
          <Markets slot="body"/>
          <MarketsSearch slot="modal-header"/>
          <Markets
            slot="modal"
            :expand-mode="true"/>
        </Card>

        <div class="flex lg:w-2/3">
          <div class="flex flex-col lg:w-1/2 mr-card-margin">

            <Card
              collapsible
              title="new order"
              class="mb-card-margin"
            />

            <Card
              :expandable="true"
              collapsible
              title="active orders"
            >
              <ActiveOrdersSearch slot="modal-header"/>
              <ActiveOrders slot="body"/>
              <ActiveOrders
                slot="modal"
                :expand-mode="true"
              />
            </Card>

          </div>
          <div class="flex flex-col lg:w-1/2">

            <Card
              collapsible
              title="order book"
              class="mb-card-margin"
            >
              <OrderBook slot="body"/>
            </Card>

            <Card
              :expandable="true"
              title="My orders history"
            >
              <OrderHistorySearch slot="modal-header"/>
              <OrderHistory slot="body"/>
              <OrderHistory
                slot="modal"
                :expand-mode="true"
              />
            </Card>

          </div>
        </div>
      </div>
    </div>

    <!-- TODO: use some vue plugin to disable when not on mobile -->
    <Mobile/>
  </div>
</template>

<script>
import Card from '@/components/Card'
import Portfolio from '@/views/Account/Portfolio.vue'
import AccountHeader from '@/views/Account/AccountHeader.vue'
import OrderBook from '@/views/OrderBook/OrderBook'
import OrderBookLastPrice from '@/views/OrderBook/OrderBookLastPrice'
import TransactionsHistory from '@/views/TransactionsHistory/'
import Markets from '@/views/Markets/Markets'
import MarketsSearch from '@/views/Markets/MarketsSearch'
import ActiveOrders from '@/views/ActiveOrders/ActiveOrders'
import OrderHistory from '@/views/OrderHistory/OrderHistory'
import OrderHistorySearch from '@/views/OrderHistory/OrderHistorySearch'
import ActiveOrdersSearch from '@/views/ActiveOrders/ActiveOrdersSearch'
import Backup from '@/views/Backup/Backup'
import Modal from '@/components/Modal/Modal'
import Mobile from '@/views/Mobile/Mobile'
import NewOrder from '@/views/NewOrder/NewOrder'

import { mapGetters, mapActions } from 'vuex'

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
    ActiveOrders,
    OrderHistory,
    OrderHistorySearch,
    ActiveOrdersSearch,
    Backup,
    Modal,
    Mobile,
    NewOrder
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      backupFlag: 'backup/getBackupFlag'
    })
  },
  methods: {
    ...mapActions('backup', ['setBackupFlag'])
  }
}
</script>
<style >
  .dashboard {
    @apply h-full;
  }
</style>
