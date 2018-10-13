<template>
  <div class="dashboard">
    <div class="flex flex-col lg:flex-row mb-2">
      <Card
        class="lg:w-1/3"
        title="account">
        <div slot="body"/>
      </Card>

      <Card
        class="lg:w-2/3"
        title="Transactions">
        <TransactionsHistory slot="body"/>
      </Card>
    </div>

    <div class="flex flex-col lg:flex-row mb-2">
      <Card
        class="lg:w-2/3 disabled"
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
    </div>

  </div>
</template>

<script>
import Card from '@/components/Card'
import TransactionsHistory from '@/views/TransactionsHistory/'

export default {
  name: 'Dashboard',
  components: { Card, TransactionsHistory }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
