<template>
  <div class="new-order-percent-selector">
    <div
      v-for="(item, index) in percentItems"
      :key="index"
      :class="{
        'new-order-percent-selector--active': item === activePercent
      }"
      class="new-order-percent-selector--item"
      @click="$emit('change', item)"
    >
      {{ item }}%
    </div>
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
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &--item {
      color: config('colors.inactive');
      padding: 3px 5px 0;
      letter-spacing: -0.7px;
      font-size: config('textSizes.xs-sm');

      &:hover {
        color: config('colors.primary');
        cursor: pointer;
      }
    }
    &--active {
      color: config('colors.primary');
      border: 1px solid config('colors.inactive');
    }
  }
</style>
