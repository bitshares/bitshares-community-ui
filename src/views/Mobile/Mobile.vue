<template>
  <div class="mobile-mode">
    <div class="mobile-mode-main">
      <component :is="activeComponentName"/>
    </div>
    <MobileFooter
      :items="menuItems"
      @click="switchActiveComponent"
    />
  </div>
</template>

<script>
import MobileFooter from '@/components/MobileFooter'
import Markets from '@/views/Markets/Markets.vue'
import Account from '@/views/Account/Portfolio.vue'
import Orders from '@/views/OrderHistory/OrderHistory.vue'
import '@icons/markets'
import '@icons/orders'
import '@icons/account'

export default {
  name: 'Mobile',
  components: { MobileFooter, Markets, Account, Orders },
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
    display: flex;
    flex-direction: column;
    .mobile-mode-main {
      flex-grow: 1;
      overflow: hidden;
      height: 100%;
    }
  }
</style>
