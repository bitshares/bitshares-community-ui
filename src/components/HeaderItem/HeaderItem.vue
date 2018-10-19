<template>
  <div class="header-item">
    <div>
      <svgicon
        :class="sort === 'asc' ? 'active' : ''"
        class="sort-arrow-up"
        name="sortArrow"
      />
      <svgicon
        :class="sort === 'desc' ? 'active' : ''"
        class="sort-arrow-down"
        name="sortArrow"
      />
    </div>
    <slot name="title" />
  </div>
</template>

<script>
import '@icons/sortArrow'

export default {
  props: {
    sort: {
      default: () => null,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.header-item {
  font-size: config('textSizes.xs-sm');
  display: flex;
  color: config('colors.sort-arrow');
}

.sort-arrow-up {
  height: 3px;
  margin-bottom: 5px;
}

.sort-arrow-up:hover {
  color: config('colors.sort-arrow-hover');
}

.sort-arrow-down:hover {
  color: config('colors.sort-arrow-hover');
}

.active {
  color: white;
}

.sort-arrow-down {
  height: 3px;
  transform: rotate(-180deg);
  margin-left: -16px;
  margin-top: 5px;
}
</style>
