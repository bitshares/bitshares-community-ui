<template>
  <div class="mobile-orders">
    <Accordion
      :items="tabs"
      :active="modeName"
      @change="setOrdersMode"
    >
      <NewOrder slot="New Order"/>
      <OrderBook slot="Order Book"/>
      <ActiveOrders slot="Active Orders"/>
      <OrderHistory slot="History"/>
    </Accordion>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Tabs from '@/components/Tabs'
import Accordion from '@/components/Accordion'
import NewOrder from '@/views/NewOrder/NewOrder.vue'
import OrderBook from '@/views/OrderBook/OrderBook.vue'
import OrderHistory from '@/views/OrderHistory/OrderHistory.vue'
import ActiveOrders from '@/views/ActiveOrders/ActiveOrders.vue'

export default {
  name: 'MobileOrders',
  components: { Tabs, OrderHistory, ActiveOrders, Accordion, NewOrder, OrderBook },
  data() {
    return {
      tabs: ['New Order', 'Order Book', 'Active Orders', 'History']
    }
  },
  computed: {
    ...mapGetters({
      modeName: 'mobile/getOrdersMode'
    })
  },
  methods: {
    ...mapActions({
      setOrdersMode: 'mobile/setOrdersMode'
    })
  }
}
</script>

<style lang="scss">
.mobile-orders {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__container {
    padding-top: 0.5rem;
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
