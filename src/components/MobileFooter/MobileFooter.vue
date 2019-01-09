<template>
  <div class="mobile-footer">
    <div
      v-for="(item, index) in items"
      v-if="!item.hide"
      :key="index"
      :style="{ width: itemWidth + '%' }"
      :class="{'active': activeTabTitle === item.title || activeTabTitle === item.name }"
      class="footer-item"
      @click="setActiveItem(index)"
    >
      <svgicon
        :name="item.icon"
        height="25"
        width="25"
        class="icon"
      /><br>
      <div class="text">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileFooter',
  props: {
    items: {
      type: Array,
      required: true
    },
    activeTabTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    itemWidth() {
      return (100 / this.items.filter(item => !item.hide).length)
    }
  },
  methods: {
    setActiveItem(index) {
      this.$emit('click', this.items[index].name)
    }
  }
}
</script>

<style lang="scss" scoped>
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
  &.active {
    background-color: config('colors.mobile-footer-hover');
    color: config('colors.text-primary');
  }
}

.text {
  @apply pt-1 pb-1;
  font-size: config('textSizes.xs');
  white-space: nowrap;
}
</style>
