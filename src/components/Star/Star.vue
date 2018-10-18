<template>
  <svgicon class="star" @click="isActive = !isActive" :name="isActive || active ? 'starFilled' : 'star'" />
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
