<template>
  <div class="mobile-dropdown">
    
  </div>
</template>

<script>
import Button from '@/components/Button'
import Portfolio from '@/views/Account/Portfolio'
import AccountHeader from '@/views/Account/AccountHeader'
import Dropdown from '@/components/Dropdown'
import { mapActions } from 'vuex'

export default {
  components: { Button, AccountHeader, Portfolio, Dropdown },
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
      showDeposit: 'deposit/toggleModal',
      toggleBackupModal: 'backup/toggleModal'
    }),
    handleLogout() {
      this.$router.push({ name: 'login' })
      this.logout()
    },
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
