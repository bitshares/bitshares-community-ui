<template>
  <div class="mobile-account">
    <div class="mobile-account-actions">
      <Button
        size="mobile-small"
        text="Deposit"
        type="secondary"
        @click="showDeposit"
      />

      <Button
        size="mobile-small"
        text="Withdraw"
        type="secondary"
        @click="showWithdraw"
      />

      <Button
        size="mobile-small"
        text="Transfer"
        type="secondary"
      />
    </div>

    <AccountHeader :large-mode="true"/>

    <Portfolio />
  </div>
</template>

<script>
import Button from '@/components/Button'
import Portfolio from '@/views/Account/Portfolio'
import AccountHeader from '@/views/Account/AccountHeader'
import { mapActions } from 'vuex'

export default {
  components: { Button, AccountHeader, Portfolio },
  methods: {
    ...mapActions({
      showDeposit: 'deposit/toggleModal',
      showWithdraw: 'withdraw/toggleModal'
    })
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

.mobile-account-actions {
  margin: 0 0 1rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
