<template>
  <svgicon
    :name="active ? 'starFilled' : 'star'"
    class="star"
  />
</template>

<script>
import '@icons/star'
import '@icons/starFilled'

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.star {
  cursor: pointer;
  color: #a7a9ac;
}
</style>
