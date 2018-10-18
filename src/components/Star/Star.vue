<template>
  <svgicon
    :name="isActive || active ? 'starFilled' : 'star'"
    class="star"
    @mouseover.native="isActive = true" @mouseleave.native="isActive = false" />
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
  },
  data: () => ({ isActive: false })
}
</script>

<style lang="scss" scoped>
.star {
  cursor: pointer;
}
</style>
