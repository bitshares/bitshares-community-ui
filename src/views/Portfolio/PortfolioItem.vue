<template>
  <div class="portfolioItem">
    <div
      class="item-header">
      <div
        :class="active1 === true ? 'item--active' : ''"
        class="item"
        @click="handleClick1()"
      >
        {{ text1 }}
      </div>
    </div>
    <div
      class="item-header">
      <div
        :class="active2 === true ? 'item--active' : ''"
        class="item"
        @click="handleClick2()"
      >
        {{ text2 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text1: {
      default: 'SHOW ALL ASSETS',
      type: String
    },
    text2: {
      default: 'SHOW BALANCES',
      type: String
    }
  },
  data() {
    return {
      active1: false,
      active2: false
    }
  },
  methods: {
    handleClick1() {
      this.active1 = !this.active1
    },
    handleClick2() {
      this.active2 = !this.active2
    }
  }
}
</script>

<style scoped lang="scss">
.portfolioItem {
  font-family: config("fonts.gotham");
  color: config('colors.text-primary');
  display: flex;
  justify-content: space-between;
}

.item-header {
  padding: 0;
  text-transform: uppercase;
  &--centered {
    justify-content: center;
  }
}

.item-header .item {
  @apply font-gotham text-base py-3;
  @apply cursor-pointer;
  color: config('colors.tab-header');
  font-size: config('textSizes.xxs-xs');
  text-align: center;
  &--active {
    @apply cursor-default;
    color: config('colors.tab-active')!important;
      border-bottom: 3px solid config('colors.tab-header');
    border-bottom-color: config('colors.tab-active')!important;
  }
  &:hover {
    color:config('colors.tab-hover');
      border-bottom: 3px solid config('colors.tab-header');
    border-bottom-color: config('colors.tab-hover');
  }
}

</style>
