<template>
  <div
    v-if="historyLoaded"
    :class="{ 'account-header--large' : large,
              'account-header--large-mode': largeMode }"
    class="account-header"
  >
    <span class="title">Balance</span>
    <span class="amount">$ {{ totalFiatValue.toFixed(2) }}</span>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AccountHeader',
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
  font-size: config('textSizes.xs-sm');
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
</style>
