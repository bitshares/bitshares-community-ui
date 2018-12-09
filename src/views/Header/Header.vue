<template>
  <div class="header hidden lg:flex">
    <div class="back-header" />
    <div class="lg:w-1/3">
      <svgicon
        name="bitshares"
        color="white"
        width="110"
        height="27"/>
    </div>

    <div class="lg:w-1/3 depositWithdraw">
      <div class="lg:w-1/4" />

      <Button
        text="Deposit"
        class="header-btn"
        type="secondary"
        size="small"
      />
      <Button
        text="Withdraw"
        class="ml-5 header-btn"
        type="secondary"
        size="small"
      />
    </div>

    <div class="lg:w-1/3 userMenuItems">
      <div class="lg:w-1/3" />
      <UserInfo class="lg:w-1/2"/>
      <Dropdown
        :items="menuItems"
        class="lg:w-1/6 dropdown"
        @clicked="handleDropdownClick"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserInfo from './HeaderUserInfo'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import '@icons/bitshares'

export default {
  name: 'Header',
  components: { UserInfo, Dropdown, Button },
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

<style lang='scss'>
.header {
  @apply py-3;
  justify-content: space-between;
  align-items: center;
  height: 3.81rem;
  background-color: transparent;
  margin: .25rem 0;
  width: 100%;

  & > * {
    z-index: 1;
  }
}

.back-header {
  position: absolute;
  width: 100%;
  left: 0;
  background: black;
  opacity: .2;
  height: 3.4375rem;
  z-index: 0;
}

.dropdown {
  text-align: right;
}

.userMenuItems, .depositWithdraw {
  & > * {
    display: inline-block;
  }
}
</style>
