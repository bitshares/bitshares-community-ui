<template>
  <div class="header hidden lg:flex">
    <svgicon
      name="bitshares"
      color="white"
      width="141"
      height="33" />
    <UserInfo />
    <Dropdown :items="menuItems" @clicked="handleDropdownClick"/>
  </div>
</template>

<script>
import UserInfo from './HeaderUserInfo'
import Dropdown from '@/components/Dropdown'
import '@icons/bitshares'

export default {
  name: 'Header',
  components: { UserInfo, Dropdown },
  data: () => ({
    menuItems: ['BACKUP', 'LOG OUT']
  }),
  methods: {
    handleDropdownClick(item) {
      console.log(item)
    }
  }
}
</script>

<style>
.header {
  @apply py-3;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
