<template>
  <div class="mobile-mode flex lg:hidden">
    <div class="mobile-mode-main">
      <Modal
        v-if="newOrderFlag"
        @close="closeOrderModal"
      >
        <NewOrder/>
      </Modal>
      <Card :title="title">
        <AccountHeader slot="header" v-if="activeComponentName === 'Account'"/>

        <component
          slot="body"
          :is="componentName"
        />
      </Card>
    </div>

    <MobileFooter
      :items="menuItems"
      @click="switchActiveComponent"
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
import Orders from '@/views/Mobile/MobileOrders.vue'
import OrderBook from '@/views/OrderBook/OrderBook.vue'
import NewOrder from '@/views/NewOrder/NewOrder.vue'
import '@icons/markets'
import '@icons/orders'
import '@icons/account'

export default {
  name: 'Mobile',
  components: { MobileFooter, Markets, Account, Orders, Card, OrderBook, Modal, NewOrder, AccountHeader },
  data() {
    return {
      activeComponentName: 'Markets',
      menuItems: [{
        name: 'Markets', title: 'Markets', icon: 'markets'
      }, {
        name: 'Orders', title: 'Orders', icon: 'orders'
      }, {
        name: 'Account', title: 'Account', icon: 'account'
      }],
      newOrderFlag: false
    }
  },
  computed: {
    componentName() {
      if (this.activeComponentName === 'Markets' && this.showOrderBook) return 'OrderBook'
      return this.activeComponentName
    },
    title() {
      const tabName = this.activeComponentName
      switch (tabName) {
        case 'Account':
          return this.userName
        case 'Orders':
          return 'My orders'
        default:
          return this.showOrderBook ? 'Order Book' : tabName
      }
    },
    ...mapGetters({
      userName: 'acc/getCurrentUserName',
      orderBookIsActive: 'orderBook/isActive'
    }),
    showOrderBook() {
      return this.activeComponentName === 'Markets' && this.orderBookIsActive
    }
  },
  methods: {
    ...mapActions({
      deinitOrderBook: 'orderBook/deinit',
      toggleBackupModal: 'backup/toggleModal',
      logout: 'acc/logout'
    }),
    switchActiveComponent(name) {
      this.deinitOrderBook()
      this.activeComponentName = name
    },
    handleLogout() {
      this.$router.push({ name: 'login' })
      this.logout()
    },
    newOrder() {
      this.newOrderFlag = true
    },
    closeOrderModal() {
      this.newOrderFlag = false
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
    }
  }

  .temp-acc-header {
    display: flex;
    .temp-acc-btn {
      margin-left: 1rem;
      border-bottom: 1px solid #ccc;
    }
  }
  .search-icon {
    margin-right: 25px;
  }
  .plus-icon {
    transform: rotate(45deg);
    padding: 5px;
  }
</style>
