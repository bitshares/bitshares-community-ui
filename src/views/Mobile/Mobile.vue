<template>
  <div class="mobile-mode flex lg:hidden">
    <div class="mobile-mode-main">
      <Card :title="title">
        <div
          slot="header"
          class="temp-acc-header"
        >
          <svgicon
            name="search"
            width="24"
            height="24"
            class="search-icon"
          />
          <Dropdown
            :items="dropdownItems"
            @clicked="handleDropdownClick"
          />
        </div>
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
import Account from '@/views/Account/MobileAccount'
import Dropdown from '@/components/Dropdown'
import Card from '@/components/Card'
import Markets from '@/views/Markets/Markets.vue'
// import Account from '@/views/Account/Portfolio.vue'
import Orders from '@/views/OrderHistory/OrderHistory.vue'
import OrderBook from '@/views/OrderBook/OrderBook.vue'
import '@icons/markets'
import '@icons/orders'
import '@icons/account'

export default {
  name: 'Mobile',
  components: { MobileFooter, Markets, Account, Dropdown, Orders, Card, OrderBook },
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
      dropdownItems: [{
        title: 'backup',
        event: 'backup'
      },
      {
        title: 'settings',
        event: 'settings',
        disabled: true
      },
      {
        title: 'faq',
        event: 'faq',
        disabled: true
      },
      {
        title: 'log out',
        event: 'logout'
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
      deinitOrderBook: 'orderBook/deinit',
      setBackupFlag: 'backup/setBackupFlag',
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
    handleDropdownClick(eventName) {
      switch (eventName) {
        case 'logout':
          this.handleLogout()
          return
        case 'backup':
          this.setBackupFlag(true)
      }
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

</style>
