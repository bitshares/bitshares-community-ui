<template>
  <div
    :class="{
      'new-order-percent-selector--active': item === activePercent
    }"
    class="new-order-percent-selector--item"
  >
    {{ item }}%
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Number,
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
  .new-order-percent-selector--item {
    color: config('colors.inactive');
    padding: 0.1875rem 0.3125rem 0;
    letter-spacing: -.0.0450rem;
    font-size: config('textSizes.xs-sm');

    &:hover {
      color: config('colors.primary');
      cursor: pointer;
    }
  }
  .new-order-percent-selector--active {
    color: config('colors.primary');
    border: 0.0625rem solid config('colors.inactive');
  }
</style>
