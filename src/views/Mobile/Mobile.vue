<template>
  <div class="mobile-mode flex lg:hidden">
    <div class="mobile-mode-main">
      <Card :title="title">
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
import Markets from '@/views/Markets/Markets.vue'
import Account from '@/views/Account/Portfolio.vue'
import Orders from '@/views/OrderHistory/OrderHistory.vue'
import OrderBook from '@/views/OrderBook/OrderBook.vue'
import '@icons/markets'
import '@icons/orders'
import '@icons/account'

export default {
  name: 'Mobile',
  components: { MobileFooter, Markets, Account, Orders, Card, OrderBook },
  data() {
    return {
      activeComponentName: 'Markets',
      menuItems: [{
        name: 'Markets', title: 'Markets', icon: 'markets'
      }, {
        name: 'Orders', title: 'Orders', icon: 'orders'
      }, {
        name: 'Account', title: 'Account', icon: 'account'
      }]
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
          return 'My orders history'
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
      deinitOrderBook: 'orderBook/deinit'
    }),
    switchActiveComponent(name) {
      this.deinitOrderBook()
      this.activeComponentName = name
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
</style>
