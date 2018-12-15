<template>
  <div class="dashboard">
    <Modal
      v-if="backupFlag"
      @close="toggleModal"
    >
      <Backup/>
    </Modal>

    <Deposit/>

    <div class="dashboard hidden lg:block">
      <div class="flex flex-col lg:flex-row mb-card-margin">
        <div class="flex flex-col lg:w-1/3 mr-card-margin">
          <div>
            <Card
              :expandable="true"
              :collapsible="true"
              title="account"
              class="mb-card-margin"
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
          </div>
          <div class="flex flex-col">
            <Card
              :expandable="true"
              :collapsible="true"
              :long="true"
              title="markets"
            >
              <MarketsSearch slot="header"/>
              <Markets slot="body"/>
              <MarketsSearch slot="modal-header"/>
              <Markets
                slot="modal"
                :expand-mode="true"/>
            </Card>
          </div>

        </div>

        <div class="flex flex-col lg:w-2/3">
          <div class="mb-card-margin">
            <Card
              :collapsible="true"
              title="graph"
            />
          </div>
          <div class="flex">
            <div class="flex flex-col lg:w-1/2 mr-card-margin">
              <Card
                :collapsible="true"
                class="mb-card-margin"
              >
                <NewOrder slot="body"/>
              </Card>
              <Card
                :expandable="true"
                :collapsible="true"
                title="my active orders"
              >
                <ActiveOrdersSearch slot="header"/>
                <ActiveOrders slot="body"/>
                <ActiveOrdersSearch slot="modal-header"/>
                <ActiveOrders
                  slot="modal"
                  :expand-mode="true"
                />
              </Card>

            </div>
            <div class="flex flex-col lg:w-1/2">
              <div>
                <Card
                  :collapsible="true"
                  title="order book"
                  class="mb-card-margin"
                >
                  <OrderBook slot="body"/>
                </Card>
              </div>

              <Card
                :expandable="true"
                :collapsible="true"
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
    </div>
    <!-- TODO: use some vue plugin to disable when not on mobile -->
    <Mobile/>
    <UnlockAccountPopup/>
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
import Deposit from '@/views/Deposit/DepositWidget'
import UnlockAccountPopup from '@/views/UnlockAccountPopup/UnlockAccountPopup'

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
    NewOrder,
    Deposit,
    UnlockAccountPopup
  },
  computed: {
    ...mapGetters({
      backupFlag: 'backup/modalDisplayed'
    })
  },
  methods: {
    ...mapActions('backup', ['toggleModal'])
  }
}
</script>
<style >
  .dashboard {
    @apply h-full;
  }
</style>
