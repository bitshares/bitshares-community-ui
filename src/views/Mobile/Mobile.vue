<template>
  <div class="mobile-mode flex lg:hidden">
    <div class="mobile-mode-main">
      <Card :title="title">
        <component
          slot="body"
          :is="activeComponentName"
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
import { mapGetters } from 'vuex'
import MobileFooter from '@/components/MobileFooter'
import Card from '@/components/Card'
import Markets from '@/views/Markets/Markets.vue'
import Account from '@/views/Account/Portfolio.vue'
import Orders from '@/views/OrderHistory/OrderHistory.vue'
import '@icons/markets'
import '@icons/orders'
import '@icons/account'

export default {
  name: 'Mobile',
  components: { MobileFooter, Markets, Account, Orders, Card },
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
    title() {
      const tabName = this.activeComponentName
      switch (tabName) {
        case 'Account':
          return this.userName
        case 'Orders':
          return 'My orders history'
        default:
          return tabName
      }
    },
    ...mapGetters({
      userName: 'acc/getCurrentUserName'
    })
  },
  methods: {
    switchActiveComponent(name) {
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
