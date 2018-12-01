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
      historyLoaded: 'history/initialLoaded',
      totalFiatValue: 'portfolio/getTotalFiatValue'
    })
  }
}
</script>

<style scoped lang="scss">
.account-header {
  font-family: config("fonts.gotham");
  font-size: config('textSizes.sm');
  align-items: baseline;
  flex-direction: row;
  color: config('colors.text-primary');
  &--large {
    .text-weak {
      font-size: config('textSizes.lg');
      text-transform: uppercase;
    }
    font-size: config('textSizes.lg');
  }
}

.title {
  opacity: 0.5;
  font-size: config('textSizes.sm');
  line-height: normal;
  margin-right: 0.5rem;
}

.account-header--large-mode {
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
  padding-top: 1rem;
  font-size: config('textSizes.lg');
  .title {
    font-size: config('textSizes.lg');
    margin-bottom: 0.2rem;
  }
  .amount {
    font-size: config('textSizes.5xl')
  }
}

.mobile-account-header {
  margin: 25px 0px 25px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  Button {
    width: 150px;
    margin: 0px 10px 0px 10px;
    line-height: 25px;
    height:50px;
    background-color: black;

    &:hover {
      background-color: config('colors.white');
    }
  }
}
</style>
