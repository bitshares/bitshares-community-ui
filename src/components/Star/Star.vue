<template>
  <div class="star">
    <svgicon
      :name="(active || hoverState) ? 'starFilled' : 'star'"
      @mouseover.native="hoverState=true" @mouseleave.native="hoverState=false"
    />
  </div>
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
  data: () => ({ hoverState: false })
}
</script>

<style lang="scss" scoped>
.star {
  cursor: pointer;
  color: config('colors.star');
}
</style>
