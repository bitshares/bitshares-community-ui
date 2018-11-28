<template>
  <div class="header hidden lg:flex">
    <svgicon
      name="bitshares"
      color="white"
      width="141"
      height="33" />
    <UserInfo />
    <Dropdown
      :items="menuItems"
      @clicked="handleDropdownClick"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserInfo from './HeaderUserInfo'
import Dropdown from '@/components/Dropdown'
import '@icons/bitshares'

export default {
  name: 'Header',
  components: { UserInfo, Dropdown },
  data: () => ({
    menuItems: [{
      title: 'backup',
      event: 'backup'
    },
    {
      title: 'settings',
      event: 'settings',
      disabled: true
    },
    {
      title: 'faq',
      event: 'faq',
      disabled: true
    },
    {
      title: 'log out',
      event: 'logout'
    }]
  }),
  methods: {
    ...mapActions({
      logout: 'acc/logout',
      setBackupFlag: 'backup/setBackupFlag'
    }),
    handleLogout() {
      this.$router.push({ name: 'login' })
      this.logout()
    },
    handleDropdownClick(eventName) {
      switch (eventName) {
        case 'logout':
          this.handleLogout()
          return
        case 'backup':
          this.setBackupFlag(true)
      }
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
