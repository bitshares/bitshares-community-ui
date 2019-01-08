<template>
  <div class="orders-container">
    <Tabs
      :tabs="tabs"
      :active="activeTab"
      @change="changeTab"
    />
    <ActiveOrders
      v-if="activeTab === 'ACTIVE'"
      slot="Active Orders"
    />
    <OrderHistory
      v-else
      slot="History"
    />
  </div>
</template>
<script>
import Tabs from '@/components/Tabs'
import OrderHistory from '@/views/OrderHistory/OrderHistory.vue'
import ActiveOrders from '@/views/ActiveOrders/ActiveOrders.vue'

export default {
  components: {
    Tabs,
    OrderHistory,
    ActiveOrders
  },
  data() {
    return {
      tabs: ['ACTIVE', 'HISTORY'],
      activeTab: 'ACTIVE'
    }
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>
<style lang="scss">
  .orders-container {
    height: 100%;
  }
  .orders-new {
    color: config('colors.primary');
  }
</style>
