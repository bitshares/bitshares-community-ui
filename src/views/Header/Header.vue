<template>
  <div class="header hidden lg:flex">
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
        class="header-btn lg:w-1/3"
        type="secondary"
        size="small"
      >Deposit</Button>
      <Button
        text="Withdraw"
        class="ml-5 header-btn lg:w-1/3"
        type="secondary"
        size="small"
      >Withdraw</Button>
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

<style lang='scss'>
.header {
  @apply py-3;
  justify-content: space-between;
  align-items: center;
  height: 61px;
  background-color: var(--black);
  margin: 5px 0px 5px 0px;
  width: 1280px;
  margin-left: -4rem;
  padding: 0rem 4rem;
}

.inline-block {
  display: inline-block;
}

.header-btn {
  @extend .inline-block;
  text-align: center;
  background-color: config('colors.bg-base');
  border: 1px solid config('colors.white');
  color: config('colors.white');
  padding: 0;
  height: 33px;
  font-size: .8em;
  text-transform: uppercase;
  height: 31px;
  width: 110px;

  &:hover {
    color: config('colors.black');
    background: config('colors.white');
  }
}

.dropdown {
  text-align: right;
}
</style>
