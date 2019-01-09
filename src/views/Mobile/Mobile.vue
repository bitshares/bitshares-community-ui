<template>
  <div class="mobile-mode flex lg:hidden">
    <div class="mobile-mode-main">
      <Card
        :title="cardTitle"
        :mobile="true"
      >
        <AccountHeader
          v-if="activeTab === 'Account'"
          slot="header"/>

        <div
          v-if="activeTab === 'OrdersContainer'"
          slot="header"
          class="orders-new"
          @click="createOrder"
        >+</div>

        <component
          slot="body"
          :is="activeTab"
        />
      </Card>
    </div>

    <MobileFooter
      :items="menuItems"
      :active-tab-title="activeTab"
      @click="setActiveTab"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MobileFooter from '@/components/MobileFooter'
import Card from '@/components/Card'
import Modal from '@/components/Modal/Modal'
import Account from '@/views/Mobile/MobileAccount.vue'
import AccountHeader from '@/views/Mobile/MobileAccountHeader.vue'
import Markets from '@/views/Markets/Markets.vue'
import OrdersContainer from '@/views/OrdersContainer/OrdersContainer.vue'
import Orders from '@/views/Mobile/MobileOrders.vue'

import '@icons/markets'
import '@icons/orders'
import '@icons/account'

export default {
  name: 'Mobile',
  components: { MobileFooter, Markets, Account, OrdersContainer, Orders, Card, Modal, AccountHeader },
  data() {
    return {
      activeComponentName: 'Markets',
      menuItems: [{
        name: 'Markets', title: 'Markets', icon: 'markets'
      }, {
        name: 'OrdersContainer', title: 'Orders', icon: 'orders'
      }, {
        name: 'Account', title: 'Account', icon: 'account'
      }, {
        name: 'Orders', title: 'Orders', icon: 'orders', hide: true
      }]
    }
  },
  computed: {
    ...mapGetters({
      userName: 'acc/getCurrentUserName',
      activeTab: 'mobile/getActiveTab'
    }),
    cardTitle() {
      return this.activeTab !== 'Orders' ? this.title : ''
    },
    title() {
      switch (this.activeTab) {
        case 'Account':
          return this.userName
        case 'OrdersContainer':
          return 'My orders'
        default:
          return this.activeTab
      }
    }
  },
  methods: {
    ...mapActions({
      setActiveTab: 'mobile/setActiveTab',
      setOrdersMode: 'mobile/setOrdersMode'
    }),
    createOrder() {
      this.setActiveTab('Orders')
      this.setOrdersMode('Order Book')
    }
  }
}
</script>

<style lang="scss">
  .mobile-mode {
    height: 100%;
    overflow: hidden;
    flex-direction: column;
    .mobile-mode-main {
      flex-grow: 1;
      overflow: hidden;
      height: 100%;

      .orders-new {
        color: config('colors.inactive');
        transform: scale(2, 2);
      }
    }
  }
</style>
