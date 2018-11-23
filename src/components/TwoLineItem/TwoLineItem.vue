<template>
  <div
    :class="{'two-line-item--expanded': expanded}"
    class="two-line-item"
  >
    <div class="two-line-item-top">{{ top }}</div>
    <div class="two-line-item-bottom">{{ bottom }}</div>
  </div>
</template>
<script>
export default {
  props: {
    top: {
      type: String,
      default: ''
    },
    bottom: {
      type: String,
      default: ''
    },
    expanded: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
  .two-line-item {
    .two-line-item-top {
      font-size: config('textSizes.lg');
      color: config('colors.primary');
      overflow: hidden;
      word-break: break-all;
      padding-top: .3rem;
    }
    .two-line-item-bottom {
      font-size: config('textSizes.sm');
      color: config('colors.inactive');
    }
    &--expanded {
      .two-line-item-top {
        font-size: config('textSizes.xl');
      }
      .two-line-item-bottom {
        font-size: config('textSizes.base');
      }
    }
  }
</style>
