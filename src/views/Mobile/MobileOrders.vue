<template>
  <div>
    <Tabs
      :tabs="['active', 'history']"
      :active="activeTab"
      @change="switchTab"
    >
      <div slot="active">
        <active-orders />
      </div>

      <div slot="history">
        <order-history />
      </div>
    </Tabs>
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
