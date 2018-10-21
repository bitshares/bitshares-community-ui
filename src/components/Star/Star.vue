<template>
  <div class="star">
    <svgicon
      :name="active ? 'starFilled' : 'star'"
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
  }
}
</script>

<style lang="scss" scoped>
.star {
  cursor: pointer;
  color: config('colors.star');
}

.star:hover {
  content: '★';
  position: absolute;
}
</style>
