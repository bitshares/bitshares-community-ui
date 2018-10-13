<template>
  <div>
    <span>{{ item.name }}</span>
    <span>{{ item.token }}</span>
    <span>{{ item.fiatValue }}</span>
    <span>{{ item.percent }}</span>
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
  grid-template-columns: repeat(4, 2fr);
  line-height: 5px;
  grid-column-gap: 30px;
  margin-right: config('margin.grid-items');
  margin-left: config('margin.grid-items');
}

.grid-items span {
    padding: 0px 0px;
    font-size: config('textSizes.sm');
}

</style>
