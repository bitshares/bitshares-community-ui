<template>
  <div class="header">
    <p>BitSharesApp</p>
    <UserInfo/>
  </div>

</template>

<script>
import UserInfo from './HeaderUserInfo'

export default {
  name: 'Header',
  components: { UserInfo }
}
</script>

<style>
.header {
  @apply px-2 py-3;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
