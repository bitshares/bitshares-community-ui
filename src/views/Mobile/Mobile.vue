<template>
  <div class="mobile-mode flex lg:hidden">
    <div class="mobile-mode-main">
      <Card
        :title="title"
        :mobile="true"
      >
        <AccountHeader
          v-if="activeTab === 'Account'"
          slot="header"/>

        <component
          slot="body"
          :is="activeTab"
        />
      </Card>
    </div>

    <MobileFooter
      :items="menuItems"
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
import Orders from '@/views/Mobile/MobileOrders.vue'
import '@icons/markets'
import '@icons/orders'
import '@icons/account'

export default {
  name: 'Mobile',
  components: { MobileFooter, Markets, Account, Orders, Card, Modal, AccountHeader },
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
    ...mapGetters({
      userName: 'acc/getCurrentUserName',
      activeTab: 'mobile/getActiveTab'
    }),
    title() {
      switch (this.activeTab) {
        case 'Account':
          return this.userName
        case 'Orders':
          return ''
        default:
          return this.activeTab
      }
    }
  },
  methods: {
    ...mapActions({
      setActiveTab: 'mobile/setActiveTab'
    })
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
