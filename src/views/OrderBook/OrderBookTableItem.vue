<template>
  <div
    :class="{
      'order-book-table-row--buy': type === 'buy',
      'order-book-table-row--sell': type === 'sell'
    }"
    class="order-book-table-row"
  >
    <div
      :class="{'order-book-table-item--last': isLast}"
      :style="styleBackground"
      class="order-book-table-item"
    >
      <span class="order-book-item-sum">
        {{ item.sum.toFixed(4) }}
      </span>
      <span class="order-book-item-price">
        {{ item.price.toFixed(4) }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
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
    },
    isLast: {
      type: Boolean,
      default: false
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
          rgba(0,0,0,1) ${percent}%
        )`
      }
    }
  }
}
</script>
<style lang="scss">
  .order-book-table-row {
    display: flex;
    padding: 0.3rem 0;
    font-size: config('textSizes.sm');
    font-family: config('fonts.gotham');
    .order-book-table-item {
      flex: 1;
      cursor: pointer;
      .order-book-item-sum {
        color: config('colors.text-primary');
      }
      &--last {
        position: relative;
        z-index: 100;
      }
      &:hover {
        .order-book-item-sum {
          color: config('colors.book-item-hover');
        }
      }
    }
    &--buy {
      text-align: left;
      flex-direction: row;
      .order-book-table-item {
        color: config('colors.buy');
        text-align: right;
        margin-right: config('margin.book-item-m');
        padding-right: config('padding.book-item-p');
        .order-book-item-sum {
          margin-left: config('margin.book-item-m10');
          float: left;
        }
      }
      &:hover {
        background: config('colors.buy');
        .order-book-table-item {
          color: config('colors.book-item-hover');
          font-weight: config('fontWeights.semibold');
          background: config('colors.buy') !important;
        }
      }
    }
    &--sell {
      text-align: right;
      flex-direction: row-reverse;
      .order-book-table-item {
        color: config('colors.sell');
        text-align: left;
        margin-left: config('margin.book-item-m');
        padding-left:config('padding.book-item-p');
        .order-book-item-sum {
          margin-right: 1rem;
          float: right;
        }
      }
      &:hover {
        background: config('colors.sell');
        .order-book-table-item {
          color: config('colors.book-item-hover');
          font-weight: config('fontWeights.semibold');
          background: config('colors.sell') !important;
        }
      }
    }
  }
</style>
