<template>
  <div class="header hidden lg:flex pr-card-row">
    <div class="back-header" />
    <div class="lg:w-1/3">
      <svgicon
        name="bitshares"
        color="white"
        width="110"
        height="27"/>
    </div>

    <div class="lg:w-1/3 deposit-withdraw">
      <Button
        text="Deposit"
        type="secondary"
        size="small"
        @click="showDepositModal"
      />
      <Button
        text="Withdraw"
        class="ml-5"
        type="secondary"
        size="small"
        @click="showWithdrawModal('withdraw')"
      />
      <Button
        text="Transfer"
        class="ml-5"
        type="secondary"
        size="small"
        @click="showWithdrawModal('transfer')"
      />
    </div>

    <div class="lg:w-1/3 user-menu-items">
      <UserInfo/>
      <Dropdown
        :items="menuItems"
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

const menuItems = [{
  title: 'change password',
  event: 'changePassword'
},
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
  name: 'Header',
  components: { UserInfo, Dropdown, Button },
  computed: {
    ...mapGetters({
      backupEnabled: 'acc/isWalletAcc'
    }),
    menuItems() {
      const items = menuItems.slice()
      if (this.backupEnabled) {
        items.unshift({
          title: 'backup',
          event: 'backup'
        })
      }
      return items
    }
  },
  methods: {
    ...mapActions({
      logout: 'acc/logout',
      showBackupModal: 'backup/toggleModal',
      showDepositModal: 'deposit/toggleModal',
      showWithdrawModal: 'withdraw/toggleModal',
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

<style lang='scss'>
.header {
  justify-content: space-between;
  align-items: center;
  height: 3.75rem;
  margin: 0 0 .625rem;
  width: 100%;
  flex-shrink: 0;
  z-index: 3;

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
  height: 3.75rem;
  z-index: 0;
}

.deposit-withdraw {
  display: flex;
  justify-content: center;
}
.user-menu-items {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
