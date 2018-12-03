<template>
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
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '@/components/Button/Button'
export default {
  name: 'AccountHeader',
  components: { Button },
  props: {
    large: {
      type: Boolean,
      default: false
    },
    largeMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      historyLoaded: 'history/initialLoaded'
    })
  }
}
</script>

<style scoped lang="scss">
.mobile-account-header {
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .mobile-account-header-btn {
    width: 165px;
    height: 48px;

    margin: 0px 7px;
    line-height: 20px;
    background-color: black;

    &:hover {
      background-color: config('colors.white');
    }
  }
}
</style>
