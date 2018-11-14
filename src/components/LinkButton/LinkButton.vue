<template>
  <div
    :class="{ 'link-button--large': large }"
    class="link-button">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    large: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.link-button {
  cursor: pointer;
  @apply font-gotham text-xs;
  color: config('colors.text-primary');
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: -0.6px;
  transition: opacity 0.15s;
  padding-bottom: 1px;
  user-select: none;
  &--large {
    font-size: config('textSizes.base')
  }
  &:hover {
    padding-bottom: 0px;
    opacity: 1;
    border-bottom: 1px solid config('colors.text-primary');
  }
}

</style>
