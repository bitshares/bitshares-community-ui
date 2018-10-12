<template>
  <div class="dashboard">
    dashboard!
    <div class="dashboard flex flex-col lg:flex-row">

      <Card
        class="lg:w-1/3"
        title="account">
        <div slot="body"/>
      </Card>

      <Card
        class="lg:w-1/3 disabled"
        title="markets">
        <div
          slot="body"
          class="uppercase">
          under construction
        </div>
      </Card>

      <Card
        class="lg:w-1/3 disabled"
        title="order book">
        <div
          slot="body"
          class="uppercase">
          under construction
        </div>
      </Card>
      <Card
        :title="'portfolio'"
        class="lg:w-1/3"
      >
        <div slot="header">
          <PortfolioHeader />
        </div>
        <div slot="body">
          <PortfolioItem />
          <Portfolio />
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Portfolio from './Portfolio/Portfolio.vue'
import PortfolioHeader from './Portfolio/PortfolioHeader.vue'
import PortfolioItem from './Portfolio/PortfolioItem.vue'

import Card from '@/components/Card'

export default {
  name: 'Dashboard',
  components: { Portfolio, PortfolioHeader, PortfolioItem, Card }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
