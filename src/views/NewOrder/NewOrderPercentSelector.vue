<template>
  <div class="new-order-percent-selector">
    <NewOrderPercentSelectorItem
      v-for="(item, index) in percentItems"
      :key="index"
      :item="item"
      :active-percent="activePercent"
      @click.native="$emit('change', item)"
    >
      {{ item }}%
    </NewOrderPercentSelectorItem>
  </div>
</template>
<script>
import NewOrderPercentSelectorItem from './NewOrderPercentSelectorItem'

export default {
  components: {
    NewOrderPercentSelectorItem
  },
  props: {
    percentItems: {
      type: Array,
      required: true
    },
    activePercent: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss">
  .new-order-percent-selector {
    margin-top: 0.9375rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &--active {
      color: config('colors.primary');
      border: 0.0625rem solid config('colors.inactive');
    }
  }
  .new-order-percent-selector-item {
    color: config('colors.inactive');
    padding: 0.1875rem 0.3125rem 0;
    letter-spacing: -0.0450rem;
    font-size: config('textSizes.xs-sm');

    &:hover {
      color: config('colors.primary');
      cursor: pointer;
    }
  }
</style>
