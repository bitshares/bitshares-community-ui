<template>
  <div class="header-item">
    <slot name="title" />
  </div>
</template>

<script>
export default {
  props: {
    sort: {
      default: () => null,
      type: String
    }
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
.header-item {
  color: config('colors.text-primary');
  opacity: 0.5;
}
</style>
