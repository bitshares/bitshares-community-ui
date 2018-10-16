<template>
  <div
    :class="{
      'filled': active === true
    }"
    class="star">
    <span>☆</span>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.star > span:hover:before {
   content: "\2605";
   position: absolute;
}
</style>
