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
  @apply mb-2;
  height: 3px;
}

.sort-arrow-up:not(.active):hover {
  color: config('colors.sort-arrow-hover');
}

.sort-arrow-down:not(.active):hover {
  color: config('colors.sort-arrow-hover');
}

.active {
  color: config('colors.text-primary');
}

.sort-arrow-down {
  @apply -ml-4 mt-1;
  height: 3px;
  transform: rotate(-180deg);
}
</style>
