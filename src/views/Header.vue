<template>
  <div class="header">
    <p>BitSharesApp</p>
    <UserInfo/>
  </div>

</template>

<script>
import UserInfo from './UserInfo'

export default {
  name: 'Header',
  components: { UserInfo }
}
</script>

<style >
  .header {
    @apply p-2;
    border: 1px solid black;
  }
</style>
