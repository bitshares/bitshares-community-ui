<template>
  <ScrollingContainer>
    <div class="mobile-orders">
      <div class="mobile-orders-new-order-title">NEW ORDER</div>
      <div class="mobile-new-order">
        <NewOrder/>
      </div>
      <Accordion
        :items="tabs"
        :active="modeName"
        @change="setOrdersMode"
      >
        <OrderBook slot="Order Book"/>
        <ActiveOrders slot="Active Orders"/>
        <OrderHistory slot="History"/>
      </Accordion>
    </div>
  </ScrollingContainer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Tabs from '@/components/Tabs'
import Accordion from '@/components/Accordion'
import NewOrder from '@/views/NewOrder/NewOrder.vue'
import OrderBook from '@/views/OrderBook/OrderBook.vue'
import OrderHistory from '@/views/OrderHistory/OrderHistory.vue'
import ActiveOrders from '@/views/ActiveOrders/ActiveOrders.vue'
import ScrollingContainer from '@/components/ScrollingContainer'

export default {
  name: 'MobileOrders',
  components: { Tabs, OrderHistory, ActiveOrders, Accordion, NewOrder, OrderBook, ScrollingContainer },
  data() {
    return {
      tabs: ['Order Book', 'Active Orders', 'History']
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
  // overflow: auto;
  padding-bottom: 1rem;
  &__container {
    padding-top: 0.5rem;
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
.mobile-orders-new-order-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  padding: .6875rem 1rem;
  position: relative;
  z-index: 10;
}
.mobile-new-order {
  height: 23.4375rem;
}
</style>
