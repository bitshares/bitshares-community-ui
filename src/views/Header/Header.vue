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
      @clicked="handleDropdownClick"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserInfo from './HeaderUserInfo'
import Dropdown from '@/components/Dropdown'
import '@icons/bitshares'

export default {
  name: 'Header',
  components: { UserInfo, Dropdown },
  computed: {
    ...mapGetters({
      backupEnabled: 'acc/isWalletAcc'
    }),
    menuItems() {
      return [{
        title: 'backup',
        event: 'backup',
        disabled: !this.backupEnabled
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
    }
  },
  methods: {
    ...mapActions({
      logout: 'acc/logout',
      showBackupModal: 'backup/toggleModal'
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
          this.showBackupModal(true)
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
