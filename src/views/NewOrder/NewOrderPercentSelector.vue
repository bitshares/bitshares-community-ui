<template>
  <div class="new-order-percent-selector">
    <NewOrderPercentSelectorItem
      v-for="(item, index) in percentItems"
      :key="index"
      :item="item"
      :active-percent="activePercent"
      @click.native="$emit('change', item)"
    />
  </div>
</template>
<script>
import NewOrderPercentSelectorItem from './NewOrderPercentSelectorItem'

export default {
  components: {
    NewOrderPercentSelectorItem
  },
  props: {
    percentItems: {
      type: Array,
      required: true
    },
    activePercent: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss">
  .new-order-percent-selector {
    margin-top: 0.9375rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
