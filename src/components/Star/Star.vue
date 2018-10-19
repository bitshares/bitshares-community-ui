<template>
  <div class="star">
    <svgicon
      :name="active ? 'starFilled' : 'star'"
      class="star"
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
  color: #a7a9ac;
}

.star:hover:before {
  content: '★';
  padding-top: 2px;
  position: absolute;
}
</style>
