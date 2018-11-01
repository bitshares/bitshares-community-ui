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
      color: green;
      text-align: right;
      margin-right: 8px;
    }
    &--sell {
      color: red;
      text-align: left;
      margin-left: 8px;
    }
  }
</style>
