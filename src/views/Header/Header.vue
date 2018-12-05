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

    <div class="lg:w-1/3">
      <div class="lg:w-1/4 inline-block" />

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

    <div class="lg:w-1/3">
      <div class="lg:w-1/3 inline-block" />
      <UserInfo class="lg:w-1/2 inline-block"/>
      <Dropdown
        :items="menuItems"
        class="lg:w-1/6 inline-block dropdown"
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
  height: 61px;
  background-color: transparent;
  margin: .25rem 0rem;
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
  height: 55px;
  z-index: 0;
}

.inline-block {
  display: inline-block;
}

.header-btn {
  @extend .inline-block;
  padding: 0;
  height: 31px;
  width: 110px;
}

.dropdown {
  text-align: right;
}
</style>
