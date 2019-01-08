<template>
  <ScrollingContainer>
    <div class="mobile-orders">
      <svgicon
        width="20"
        height="20"
        class="mobile-orders-back"
        name="arrowDown"
        @click="goBack"
      />
      <div
        class="mobile-orders-new-order-title"
        @click="goBack"
      >
        {{ orderTitle }}
        <svgicon
          width="11"
          height="11"
          name="arrowDown"
        />
      </div>
      <Star
        :active="isFavourite"
        class="mobile-orders-star"
        @click.stop.native="changeFavourite"
      />
      <div class="mobile-orders-chart">
        <svgicon
          width="375"
          height="210"
          name="chart"
        />
      </div>
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
import Star from '@/components/Star'

import '@icons/arrowDown'
import '@icons/chart'

export default {
  name: 'MobileOrders',
  components: { Tabs, OrderHistory, ActiveOrders, Accordion, NewOrder, OrderBook, ScrollingContainer, Star },
  data() {
    return {
      tabs: ['Order Book', 'Active Orders', 'History']
    }
  },
  computed: {
    ...mapGetters({
      modeName: 'mobile/getOrdersMode',
      base: 'newOrder/getBase',
      quote: 'newOrder/getQuote',
      isTickerFavourite: 'marketsMonitor/isTickerFavourite'
    }),
    orderTitle() {
      return `NEW ORDER ${this.base}/${this.quote}`
    },
    isFavourite() {
      return this.isTickerFavourite(this.base, this.quote)
    }
  },
  methods: {
    ...mapActions({
      setOrdersMode: 'mobile/setOrdersMode',
      setActiveTab: 'mobile/setActiveTab',
      toggleFavourite: 'marketsMonitor/toggleFavourite'
    }),
    goBack() {
      this.setActiveTab('Markets')
    },
    changeFavourite() {
      this.toggleFavourite({ base: this.base, quote: this.quote })
    }
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
  .mobile-orders-back {
    position: absolute;
    color: config('colors.primary');
    transform: rotate(90deg);
    left: 0.3125rem;
    top: 0.4875rem;
    z-index: 100;
  }
  .mobile-orders-chart {
  }
  .mobile-orders-star {
    position: absolute;
    right: 0.7125rem;
    top: 0.4875rem;
    z-index: 1000;
  }
}
.mobile-orders-new-order-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: white;
  padding: .6875rem 1rem;
  position: relative;
  z-index: 10;
  text-align: center;
  width: 80%;
  margin: 0 auto;
}
.mobile-new-order {
  height: 23.4375rem;
}
</style>
