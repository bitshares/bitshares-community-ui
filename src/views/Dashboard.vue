<template>
  <div class="dashboard">
    dashboard!
    <Card
      :title="'portfolio'">
      <div slot="header">
        <PortfolioHeader />
      </div>
      <div slot="body">
        <Tabs :tabs="['SHOW ALL ASSETS', 'SHOW BALANCES']">
          <div slot="SHOW ALL ASSETS">
            <Portfolio />
          </div>
          <div slot="SHOW BALANCES">
            <Portfolio />
          </div>
        </Tabs>
      </div>
    </Card>
  </div>
</template>

<script>
import Portfolio from './Portfolio/Portfolio.vue'
import PortfolioHeader from './Portfolio/PortfolioHeader.vue'
import Tabs from '@/components/Tabs'
import Card from '@/components/Card'

export default {
  name: 'Dashboard',
  components: { Portfolio, PortfolioHeader, Tabs, Card }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
