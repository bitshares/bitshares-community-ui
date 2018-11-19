<template>
  <div class="dashboard">
    <Modal
      v-if="backupFlag"
      @close="setBackupFlag(false)"
    >
      <Backup/>
    </Modal>
    <div class="dashboard hidden lg:block">
      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          :expandable="true"
          collapsible
          class="lg:w-1/3"
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
        <Card
          collapsible
          class="lg:w-2/3 disabled"
          title="Graph"
        />
      </div>
      <div class="flex flex-col lg:flex-row mb-2">
        <Card
          :expandable="true"
          collapsible
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
          v-if="orderBookIsActive"
          collapsible
          class="lg:w-1/3"
          title="order book">
          <OrderBook slot="body"/>
        </Card>
        <Card
          class="lg:w-1/3"
          title="My orders history"
          :expandable="true"
        >
          <!-- <OrderHistorySearch slot="header"/> -->
          <OrderHistory slot="body"/>
          <OrderHistory
            slot="modal"
          />
        </Card>
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
import OrderHistory from '@/views/OrderHistory/OrderHistory'
import OrderHistorySearch from '@/views/OrderHistory/OrderHistorySearch'
import Backup from '@/views/Backup/Backup'
import Modal from '@/components/Modal/Modal'
import Mobile from '@/views/Mobile/Mobile'

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
    OrderHistory,
    OrderHistorySearch,
    Backup,
    Modal,
    Mobile
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      backupFlag: 'backup/getBackupFlag',
      orderBookIsActive: 'orderBook/isActive'
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
