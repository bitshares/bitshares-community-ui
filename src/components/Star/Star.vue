<template>
  <div
    :class="{'star--active': active}"
    class="star"
  >
    <svgicon
      class="star-icon"
      name="star"
      height="19"
      width="19"
    />
    <svgicon
      class="star-filled-icon"
      name="starFilled"
      height="19"
      width="19"
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

<style lang="scss">
.star {
  cursor: pointer;
  color: config('colors.star');
  .star-filled-icon {
    display: none;
  }
}

.star.star--active {
  color: config('colors.white');
  .star-filled-icon {
    display: inline-block;
  }
  .star-icon {
    display: none;
  }
}

@screen sm {
  .star:hover {
    .star-icon {
      display: none;
    }
    .star-filled-icon {
      display: block;
    }
  }
}

</style>
