<template>
  <div class="dashboard">
    dashboard!
    <Card
      :title="'portfolio'">
      <div slot="header">BALANCE 6754 USD</div>
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
import Portfolio from '@/components/Portfolio'
import Tabs from '@/components/Tabs'
import Card from '@/components/Card'

export default {
  name: 'Dashboard',
  components: { Portfolio, Tabs, Card }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
