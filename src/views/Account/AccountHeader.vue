<template>
  <div
    v-if="historyLoaded"
    :class="{ 'account-header--large' : large }"
    class="account-header"
  >
    <div class="text-weak">
    Balance</div>&nbsp; $ {{ totalFiatValue.toFixed(2) }}
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
  display: flex;
  align-items: baseline;
  color: config('colors.text-primary');
  &--large {
    .text-weak {
      font-size: config('textSizes.lg');
      text-transform: uppercase;
    }
    font-size: config('textSizes.lg');
  }
}

.text-weak {
  opacity: 0.5;
  font-size: config('textSizes.xs-sm');
  line-height: normal;
}
</style>
