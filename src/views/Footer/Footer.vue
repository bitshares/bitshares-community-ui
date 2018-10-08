<template>
  <div class="footer">
    <ConnectionIndicator/>
  </div>
</template>

<script>
import ConnectionIndicator from './FooterConnectionIndicator'

export default {
  name: 'Footer',
  components: { ConnectionIndicator }
}
</script>

<style >
  .footer {
    @apply p-2;
    display: flex;
    justify-content: flex-end;
    border: 1px solid black;
  }
</style>
