<template>
  <div
    :class="{
      'order-book__tableRow--buy': type === 'buy',
      'order-book__tableRow--sell': type === 'sell'
    }"
    class="order-book__tableRow"
  >
    <div
      :class="{
        'order-book__tableItem--buy': type === 'buy',
        'order-book__tableItem--sell': type === 'sell'
      }"
      :style="styleBackground"
      class="order-book__tableItem"
    >
      <span class="order-book__itemSum">
        {{ item.sum }}
      </span>
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
    height: 26px;
    line-height: 26px;

    .order-book__tableItem {
      .order-book__itemSum {
        color: config('colors.text-primary');
      }
      &:hover {
        .order-book__itemSum {
          color: config('colors.button-text');
        }
      }
    }
    &--buy {
      text-align: left;
      flex-direction: row;
      &:hover {
        background: config('colors.buy');
        .order-book__tableItem {
          color: config('colors.button-text');
          font-weight: config('fontWeights.semibold');
          &--buy {
            background: linear-gradient(to left, config('colors.buy') 100%, config('colors.card-background') 0%) !important;
          }
        }
      }
    }
    &--sell {
      text-align: right;
      flex-direction: row-reverse;
      &:hover {
        background: config('colors.sell');
        .order-book__tableItem {
          color: config('colors.button-text');
          font-weight: config('fontWeights.semibold');
          &--sell {
            background: linear-gradient(to right, config('colors.sell') 100%, config('colors.card-background') 0%) !important;
          }
        }
      }
    }
  }
  .order-book__tableItem {
    cursor: pointer;
    &--buy {
      flex: 1;
      color: config('colors.buy');
      text-align: right;
      margin-right: 0.0325rem;
      padding-right: 0.625rem;
      .order-book__itemSum {
        float: left;
      }
    }
    &--sell {
      flex: 1;
      color: config('colors.sell');
      text-align: left;
      margin-left: 0.0325rem;
      padding-left: 0.625rem;
      .order-book__itemSum {
        float: right;
      }
    }
  }
</style>
