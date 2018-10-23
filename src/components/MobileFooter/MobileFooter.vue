<template>
  <div class="mobile-footer">
    <div
      v-for="(item, index) in items"
      :key="index"
      :style="{ width: itemWidth + '%' }"
      :class="activeIndex === index ? 'active' : ''"
      class="footer-item"
      @click="$emit('click')"
    >
      <svgicon
        :name="item.icon"
        height="33"
        width="33"
        class="icon"
      /><br>
      <div class="text">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import '@icons/paste'

export default {
  name: 'MobileFooter',
  props: {
    items: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  computed: {
    itemWidth() {
      return (100 / this.items.length)
    }
  }
}
</script>

<style>
@screen sm {
    .mobile-footer {
        display: none;
    }
}

@media (max-width: config('screens.sm')) {
.mobile-footer {
    display: flex;
    position: fixed;
    bottom: 0;
    width:100%;
    text-align: center;
    color:config('colors.text-primary');
}

.footer-item {
    @apply pt-1 px-10 pb-0 mx-1;
    background-color: config('colors.mobile-footer');
    opacity: 0.7;
}

.footer-item:last-child {
  @apply m-0;
}

.footer-item:first-child {
  @apply m-0;
}

.footer-item:hover {
     background-color: config('colors.mobile-footer-hover');
     opacity: 1;
}

.text {
  @apply pt-1 pb-1;
  font-size: config('textSizes.xs-sm');
}
}
</style>
