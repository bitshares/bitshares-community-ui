<template>
  <div
    :class="{
      'order-book__tableRow--sell': type === 'sell'
    }"
    class="order-book__tableRow"
  >
    <div class="order-book__tableItem">{{ item.sum }}</div>
    <div
      :class="{
        'order-book__tableItem--buy': type === 'buy',
        'order-book__tableItem--sell': type === 'sell'
      }"
      :style="styleBackground"
      class="order-book__tableItem"
    >
      {{ item.price }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    align: {
      type: String,
      default: 'left'
    },
    type: {
      type: String,
      default: 'buy'
    },
    maxSum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    gradientDirection() {
      return this.type === 'sell' ? 'to right' : 'to left'
    },
    gradientColor() {
      return this.type === 'sell' ? '30, 3, 2, 1' : '13, 23, 2, 1'
    },
    styleBackground() {
      const percent = Math.round(100 / this.maxSum * this.item.sum)
      return {
        'background': `
          linear-gradient(${this.gradientDirection},
          rgba(${this.gradientColor}) ${percent}%,
          rgba(0,0,0,1) ${percent}%,
          rgba(0,0,0,1) ${percent}%
        )`
      }
    }
  }
}
</script>
<style lang="scss">
  .order-book__tableRow {
    display: flex;
    margin-bottom: 10px;

    &--sell {
      text-align: right;
      flex-direction: row-reverse;
    }
  }
  .order-book__tableItem {
    flex: 1;

    &--buy {
      color: config('colors.buy');
      text-align: right;
      //margin-right: 8px;
    }
    &--sell {
      color: config('colors.sell');
      text-align: left;
      //margin-left: 8px;
    }
  }
</style>
