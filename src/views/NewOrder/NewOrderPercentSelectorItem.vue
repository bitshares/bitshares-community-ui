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
    padding: 3px 5px 0;
    letter-spacing: -0.7px;
    font-size: config('textSizes.xs-sm');

    &:hover {
      color: config('colors.primary');
      cursor: pointer;
    }
  }
  .new-order-percent-selector--active {
    color: config('colors.primary');
    border: 1px solid config('colors.inactive');
  }
</style>
