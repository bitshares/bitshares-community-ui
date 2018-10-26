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
    <div :class="sort ? 'title-active' : ''">
      {{ title }}
    </div>
  </div>
</template>

<script>
import '@icons/sortArrow'

export default {
  props: {
    sort: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.header-item {
  font-size: config('textSizes.xs-sm');
  display: flex;
  color: config('colors.tab-header');
}

.sort-arrow-up {
  @apply mb-2;
  height: 0.1875rem;
}

.sort-arrow-up:not(.active):hover {
  color: config('colors.tab-hover');
}

.sort-arrow-down:not(.active):hover {
  color: config('colors.tab-hover');
}

.active {
  color: config('colors.text-primary');
}

.sort-arrow-down {
  @apply -ml-4 mt-1;
  height: 0.1875rem;
  transform: rotate(-180deg);
}

.title-active {
  color: config('colors.text-primary');
}
</style>
