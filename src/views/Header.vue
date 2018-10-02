<template>
  <div class="header">
    <p>BitSharesApp</p>
    <ConnectionIndicator/>
    <UserInfo/>
  </div>

</template>

<script>
import ConnectionIndicator from '@/views/ConnectionIndicator.vue'
import UserInfo from './UserInfo'

export default {
  name: 'Header',
  components: { UserInfo, ConnectionIndicator }
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
