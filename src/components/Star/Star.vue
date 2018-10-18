<template>
  <div class="star">
    <svgicon :name="star" />
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
  data: function() {
    if (this.active) {
      return {
        star: 'starFilled'
      }
    } else {
      return {
        star: 'star'
      }
    }
  },
  methods: {
    fill: function() {
      this.active = true
    }
  }
}
</script>

<style lang="scss" scoped>
.star:hover:before {
   content: "\2605";
   padding-top:config('padding.2px');
   position: absolute;
}
</style>
