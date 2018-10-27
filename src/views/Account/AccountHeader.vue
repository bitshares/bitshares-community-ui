<template>
  <div
    v-if="historyLoaded"
    class="portfolio-header"
  >
    <div class="text-weak">
    Balance</div>&nbsp; {{ totalFiatValue }} USD
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AccountHeader',
  computed: {
    ...mapGetters({
      historyLoaded: 'history/initialLoaded',
      totalFiatValue: 'portfolio/getTotalFiatValue'
    })
  }
}
</script>

<style scoped lang="scss">
.portfolio-header {
  font-family: config("fonts.gotham");
  font-size: config('textSizes.sm');
  display: flex;
  padding-right: 0.3rem;
  align-items: baseline;
  color: config('colors.text-primary');
}

.text-weak {
  opacity: 0.5;
  font-size: config('textSizes.xs-sm');
  line-height: normal;
}
</style>
