<template>
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
      class="lg:w-2/3 scrollable"
      title="Transactions">
      <div slot="body">
        <TransactionsHistory/>
      </div>
    </Card>
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
  .scrollable {
    overflow: auto;
    overflow-y: scroll;
  }
</style>
