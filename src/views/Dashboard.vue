<template>
  <div class="dashboard">
    dashboard!
    <Card
      :title="'portfolio'">
      <div slot="header">
        <PortfolioHeader />
      </div>
      <div slot="body">
        <PortfolioItem />
        <Portfolio />
      </div>
    </Card>
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
