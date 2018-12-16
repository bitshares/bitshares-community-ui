<template>
  <perfect-scrollbar>
    <div
      :class="{'scrollable-container--empty-area': emptyArea}"
      class="scrollable-container"
    >
      <div
        :style="{ height: shadowerHeight + 'px' }"
        class="scrollable-container__shadower-top"/>
      <div
        :style="{ height: shadowerHeight + 'px' }"
        class="scrollable-container__shadower-bottom"/>
      <slot/>
    </div>
  </perfect-scrollbar>
</template>

<script>
export default {
  props: {
    shadowerHeight: {
      type: Number,
      default: 30
    },
    emptyArea: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.scrollable-container {
  flex-grow: 1;
  position: relative;
  height: 100%;
  overflow: hidden;

  &--empty-area {
    margin-top: 1.5rem;
  }
  &__shadower-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(black, rgba(0, 0, 0, 0));
    pointer-events: none;
    z-index: 2;
  }
  &__shadower-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(rgba(0, 0, 0, 0), black);
    pointer-events: none;
    z-index: 2;
  }
}
</style>
