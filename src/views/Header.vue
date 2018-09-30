<template>
  <div class="header">BitSharesApp</div>
  <!-- <UseerInfo/> -->
</template>

<script>
import UserInfo from './UserInfo'

export default {
  components: { UserInfo },
  name: 'Header'
}
</script>

<style >
  .header {
    @apply p-2;
    border: 1px solid black;
  }
</style>
