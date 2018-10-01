<template>
  <div class="header">
    BitSharesApp
    <ConnectionIndicator/>
  </div>
</template>

<script>
import ConnectionIndicator from '@/views/ConnectionIndicator.vue'

export default {
  name: 'Header',
  components: { ConnectionIndicator }
}
</script>

<style>
  .header {
    @apply p-2;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
