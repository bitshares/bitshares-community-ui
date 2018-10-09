<template>
  <div class="dashboard">
    <Card title="Markets"/>

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
