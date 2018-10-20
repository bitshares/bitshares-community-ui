<template>
  <div class="mobile-footer">
    <div
        v-for="(item, index) in items"
        :key="index"
        :style="{ width: itemWidth + '%' }"
        :class="activeIndex === index ? 'active' : ''"
        class="footer-item"
        @click="$emit('itemClick')"
        v-on:itemClick="handleClick(index)"
        >
        {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mobile Footer',
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
  },
    methods: {
    handleClick(index) {
      this.activeIndex = index
      this.$emit('change', this.items[index])
    }
  }
}
</script>

<style>
@media (min-width: config('screens.sm')) {
    .mobile-footer {
        display: none;
    }
}

@media (max-width: config('screens.sm')) {
.mobile-footer {
    position: fixed;
    text-align: center;
    bottom: 0;
    width:100%;
    display: flex;
    color:config('colors.text-primary');
}

.footer-item {
    padding: 40px;
    margin: 4px;
    background-color: config('colors.mobile-footer');
}

.footer-item:hover {
     background-color: config('colors.mobile-footer-hover');
}
}
</style>
