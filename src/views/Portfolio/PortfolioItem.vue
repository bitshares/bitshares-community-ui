<template>
  <div>
    <span>{{ item.symbol }}</span>
    <span>{{ item.tokens }}</span>
    <!-- <span></span> -->
    <!-- <span></span> -->
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
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  padding: config('padding.grid-table');
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  line-height: 5px;
  grid-column-gap: 30px;
  padding-left: config('padding.0');
  padding-right: config('padding.0');
}

.grid-items span {
    padding: 0px 0px;
    font-size: config('textSizes.sm');
    &:not(:first-child) {
      text-align: right;
    }
}

</style>
