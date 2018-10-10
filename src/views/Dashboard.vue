<template>
  <div class="dashboard flex flex-col lg:flex-row">

    <Card
      class="lg:w-1/3"
      title="portfolio">
      <div slot="body"/>
    </Card>

    <Card
      :disabled="true"
      class="lg:w-1/3"
      title="markets">
      <div
        slot="body"
        class="uppercase text-grey-dark">
        under construction
      </div>
    </Card>

    <Card
      :disabled="true"
      class="lg:w-1/3"
      title="order book">
      <div
        slot="body"
        class="uppercase text-grey-dark">
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
