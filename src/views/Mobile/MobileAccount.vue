<template>
  <div>
    <div class="mobile-account-header">
      <div class="xs:w-1/2 sm:w-1/2">
        <Button
          class="mobile-account-header-btn"
          text="Deposit"
          type="secondary"
        />
      </div>

      <div class="xs:w-1/2 sm:w-1/2">
        <Button
          class="mobile-account-header-btn"
          text="Withdraw"
          type="secondary"
        />
      </div>
    </div>

    <AccountHeader
      :large-mode="true"
      class="flex md:hidden"
    />

    <Portfolio />
  </div>
</template>

<script>
import LoadingContainer from '@/components/LoadingContainer'
import Button from '@/components/Button'
import Portfolio from '@/views/Account/Portfolio'
import AccountHeader from '@/views/Account/AccountHeader'

export default {
  components: { Button, AccountHeader, Portfolio, LoadingContainer }
}
</script>

<style lang="scss" scoped>
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
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .mobile-account-header-btn {
    width: 10.3rem;
    height: 3rem;

    margin: 0 .5rem;
    line-height: 1.5rem;
    background-color: black;

    &:hover {
      background-color: config('colors.white');
    }
  }
}
</style>
