<template>
  <div class="sm:hidden">
    <div class="mobile-footer">
      <div
        v-for="(item, index) in items"
        :key="index"
        :style="{ width: itemWidth + '%' }"
        :class="{'active': activeIndex === index }"
        class="footer-item"
        @click="$emit('click', item.name)"
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
  </div>
</template>

<script>
import '@icons/paste'

export default {
  name: 'MobileFooter',
  props: {
    items: {
      type: Array,
      required: true
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
  },
  created() {
    this.$emit('click', this.items[0].name)
  }
}
</script>

<style>
.mobile-footer {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    width:100%;
    text-align: center;
    color:config('colors.text-primary');
}

.footer-item {
    @apply pt-1 px-6;
    background-color: config('colors.mobile-footer');
    color: config('colors.grey');
}

.footer-item:hover {
     background-color: config('colors.mobile-footer-hover');
     color: config('colors.text-primary');
}

.text {
  @apply pt-1 pb-1;
  font-size: config('textSizes.xs-sm');
  text-overflow: hidden;
  white-space: nowrap;
}
</style>
