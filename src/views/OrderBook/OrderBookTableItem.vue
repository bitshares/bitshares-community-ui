<template>
  <div>{{ item.sum }} {{ item.price }}</div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    align: {
      type: String,
      default: 'left'
    }
  }
}
</script>
<style lang="scss">
</style>
