<template>
  <div class="order-percents">
    <div
      v-for="(percent, index) in percents"
      :key="index"
      :class="{'order-percents-item--active': activePercent == percent}"
      class="order-percents-item"
      @click="setActivePercent(percent)"
    >
      {{ percent }}%
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    percents: {
      type: Array,
      default() {
        return [10, 25, 50, 75]
      }
    }
  },
  computed: {
    ...mapGetters({
      activePercent: 'newOrder/getActivePercent'
    })
  },
  methods: {
    ...mapActions({
      setActivePercent: 'newOrder/setActivePercent'
    })
  }
}
</script>
<style lang="scss">
  .order-percents {
    z-index: 10;
    position: absolute;
    left: calc(50% - 4.5rem);
    top: 7.3rem;
    text-align: center;
    width: 9rem;
    box-sizing: border-box;

    .order-percents-item {
      font-size: config('textSizes.xs-sm');
      color: config('colors.inactive');
      display: inline-block;
      box-sizing: border-box;
      height: 1.25rem;
      letter-spacing: -.65px;
      margin-right: .1rem;
      margin-left: .1rem;
      padding: 3px;
      cursor: pointer;

      &--active {
        border: 1px solid config('colors.inactive');
      }
    }
  }
</style>
