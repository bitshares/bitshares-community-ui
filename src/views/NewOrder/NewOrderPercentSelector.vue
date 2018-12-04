<template>
  <div class="new-order-percent-selector">
    <a
      v-for="(item, index) in percentItems"
      :key="index"
      :class="{
        'new-order-percent-selector-item--active': item === activePercent
      }"
      class="new-order-percent-selector-item"
      @click="$emit('change', item)"
    >
      {{ item }}%
    </a>
  </div>
</template>
<script>
export default {
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
  }
  .new-order-percent-selector-item {
    color: config('colors.inactive');
    padding: 0.1875rem 0.3125rem 0;
    letter-spacing: -0.0450rem;
    font-size: config('textSizes.xs-sm');

    &--active {
      color: config('colors.primary');
      border: 0.0625rem solid config('colors.inactive');
    }

    &:hover {
      color: config('colors.primary');
      cursor: pointer;
    }
    &:active {
      border: 0.0625rem solid config('colors.inactive');
      color: config('colors.primary');
    }
  }
</style>
