<template>
  <div class="mobile-orders">
    <Tabs
      :tabs="['active', 'history']"
      :active="activeTab"
      @change="switchTab"
    />
    <ActiveOrders v-if="activeTab === 'active'"/>

    <OrderHistory v-if="activeTab === 'history'"/>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
import OrderHistory from '@/views/OrderHistory/OrderHistory.vue'
import ActiveOrders from '@/views/ActiveOrders/ActiveOrders.vue'

export default {
  name: 'MobileOrders',
  components: { Tabs, OrderHistory, ActiveOrders },
  data() {
    return {
      activeTab: 'active'
    }
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style>
.mobile-orders {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
