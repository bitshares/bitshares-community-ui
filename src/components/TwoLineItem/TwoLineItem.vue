<template>
  <div
    :class="{'two-line-item--expanded': expanded}"
    class="two-line-item"
  >
    <div class="two-line-item-top">
      <slot name="top">
        {{ top }}
      </slot>
    </div>
    <div class="two-line-item-bottom">
      <slot name="bottom">
        {{ bottom }}
      </slot>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    top: {
      type: [String, Number],
      default: ''
    },
    bottom: {
      type: [String, Number],
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
    letter-spacing: -0.0563rem;
    padding-right: 0.0563rem;
    .two-line-item-top {
      font-size: config('textSizes.lg');
      color: config('colors.primary');
      overflow: hidden;
      word-break: break-all;
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
