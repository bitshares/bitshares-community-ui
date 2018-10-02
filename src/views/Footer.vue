<template>
  <div class="footer">
    <ConnectionIndicator/>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style >
  .footer {
    @apply p-2;
    display: flex;
    justify-content: flex-end;
  }
</style>
