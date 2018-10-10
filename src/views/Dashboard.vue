<template>
  <div class="dashboard">
    dashboard!
    <Portfolio />
  </div>
</template>

<script>
import Portfolio from '@/components/Portfolio'

export default {
  name: 'Dashboard',
  components: { Portfolio }
}
</script>

<style >
  .dashboard {
    @apply h-full;
  }
</style>
