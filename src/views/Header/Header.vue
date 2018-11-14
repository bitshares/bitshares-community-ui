<template>
  <div class="header hidden lg:flex">
    <svgicon
      name="bitshares"
      color="white"
      width="141"
      height="33"/>
    <UserInfo/>
  </div>

</template>

<script>
import UserInfo from './HeaderUserInfo'
import '@icons/bitshares'

export default {
  name: 'Header',
  components: { UserInfo }
}
</script>

<style>
.header {
  @apply px-2 py-3;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
