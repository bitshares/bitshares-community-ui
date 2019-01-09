<template>
  <div
    slot="header"
    class="temp-acc-header"
  >
    <Dropdown
      :mobile="true"
      :title="username"
      :items="menuItems"
      @clicked="handleDropdownClick"
    />
  </div>
</template>

<script>
import Button from '@/components/Button'
import Portfolio from '@/views/Account/Portfolio'
import AccountHeader from '@/views/Account/AccountHeader'
import Dropdown from '@/components/Dropdown'
import { mapGetters, mapActions } from 'vuex'

const menuItems = [
  {
    title: 'CHANGE GATEWAY',
    event: 'changeGateway',
    disabled: true
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

export default {
  components: { Button, AccountHeader, Portfolio, Dropdown },
  computed: {
    ...mapGetters({
      username: 'acc/getCurrentUserName',
      backupEnabled: 'acc/isWalletAcc',
      loginType: 'acc/getLoginType'
    }),
    menuItems() {
      const items = menuItems.slice()
      if (this.backupEnabled) {
        items.unshift({
          title: 'backup',
          event: 'backup'
        })
      }
      if (this.loginType !== 'password') {
        items.unshift({
          title: 'change password',
          event: 'changePassword'
        })
      }
      return items
    }
  },
  methods: {
    ...mapActions({
      showDeposit: 'deposit/toggleModal',
      toggleBackupModal: 'backup/toggleModal',
      logout: 'acc/logout',
      showBackupModal: 'backup/toggleModal',
      showChangePasswordModal: 'changePassword/toggleModal'
    }),
    handleLogout() {
      this.$router.push({ name: 'login' }, () => {
        this.logout()
      })
    },
    handleDropdownClick(eventName) {
      switch (eventName) {
        case 'changePassword':
          this.showChangePasswordModal(true)
          return
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

<style lang="scss" scoped>
.mobile-account {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.portfolio-table {
  height: 100%;
  overflow: hidden;
}

.portfolio-header {
  font-family: config("fonts.gotham");
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding: 0 1.5rem 0 1rem;
}

.mobile-account-header {
  margin: 0 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
