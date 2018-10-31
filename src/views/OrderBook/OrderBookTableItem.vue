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
    }
  }
}
</script>
<style lang="scss">
</style>
