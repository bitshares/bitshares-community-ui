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
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'Dashboard',
  components: { Card }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
