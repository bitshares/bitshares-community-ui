<template>
  <div>
    <span>{{ item.tiker }}</span>
    <span>{{ item.tokens }}</span>
    <span>{{ item.fiatValue }}</span>
    <span>{{ item.share }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      default: () => {},
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">

.grid-items div {
  color: config('colors.text-primary');
  padding: config('padding.grid-table');
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  line-height: 5px;
  padding-left: config('padding.0');
  padding-right: config('padding.0');
  transition: background-color 0.15s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2)
  }
}

.grid-items span {
    padding: 0px 0px;
    font-size: config('textSizes.sm');
    &:not(:first-child) {
      text-align: right;
    }
}

</style>
