<template>
  <div class="w-full balance">
    <span class="title">BALANCE</span>
    <span class="amount">$ {{ totalFiatValue ? totalFiatValue.toFixed(2) : 0 }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      totalFiatValue: 'portfolio/getTotalFiatValue'
    })
  }
}
</script>

<style lang="scss" scoped>
.balance {
    margin: 2rem 0;
}

.title, .amount {
  color: config('colors.text-primary');
  display: block;
  text-align: center;
}

.title {
  font-size: config('textSizes.lg');
  margin-bottom: 0.5rem;
  opacity: 0.5;
  font-size: config('textSizes.sm');
  line-height: normal;
  margin-right: 0.5rem;
}

.amount {
  font-size: config('textSizes.5xl')
}

</style>
