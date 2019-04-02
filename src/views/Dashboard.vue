<template>

  <v-breakpoint>
    <div
      slot-scope="scope"
      class="dashboard">
      <Modal
        v-if="backupFlag"
        @close="toggleBackupModal"
      >
        <Backup/>
      </Modal>

      <div
        v-if="scope.isLarge || scope.isXlarge"
        class="dashboard hidden lg:block">
        <div class="flex flex-col lg:flex-row mb-card-margin">
          <div class="flex flex-col lg:w-1/3 pr-card-row">
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

          <div class="flex flex-col lg:w-2/3 pr-card-row">
            <div class="mb-card-margin">
              <Card
                :collapsible="true"
                title="graph"
              >
                <Graph slot="body"/>
              </Card>
            </div>
            <div class="flex">
              <div class="flex flex-col lg:w-1/2 pr-half-card-row">
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
              <div class="flex flex-col lg:w-1/2 pl-half-card-row">
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

      <Deposit/>
      <Withdraw/>
      <ChangePassword/>
      <Mobile v-if="scope.isSmall || scope.isMedium || scope.noMatch"/>

      <UnlockAccountPopup/>
    </div>
  </v-breakpoint>
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
import Withdraw from '@/views/Withdraw/WithdrawWidget'
import ChangePassword from '@/views/ChangePassword/ChangePasswordWidget'
import UnlockAccountPopup from '@/views/UnlockAccountPopup/UnlockAccountPopup'
import Graph from '@/views/Graph/Graph'
import { VBreakpoint } from 'vue-breakpoint-component'

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
    Withdraw,
    UnlockAccountPopup,
    Graph,
    VBreakpoint,
    ChangePassword
  },
  computed: {
    ...mapGetters({
      backupFlag: 'backup/modalDisplayed'
    })
  },
  methods: {
    ...mapActions({
      toggleBackupModal: 'backup/toggleModal'
    })
  }
}
</script>
<style >
  .dashboard {
    @apply h-full;
  }
</style>
