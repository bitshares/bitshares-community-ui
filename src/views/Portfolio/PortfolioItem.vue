<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="grid-items"
    >
      <span>{{ item.name }}</span>
      <span>{{ item.token }}</span>
      <span>{{ item.fiatValue }}</span>
      <span>{{ item.percent }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      default: () => [],
      type: Array
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
  grid-template-columns: repeat(4, 1fr);
  line-height: 5px;
}

.grid-items span {
    padding: 8px 15px;
    font-size: config('textSizes.sm');
}

</style>
