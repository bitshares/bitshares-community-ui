<template>
  <div class="header-item">
    <div class="header-item__arrows" v-show="sort">
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
  justify-content: flex-end;
  color: config('colors.tab-header');
  cursor: pointer;
  user-select: none;
  position: relative;
}

.header-item__arrows {
  position: absolute;
  left: 100%;
}


.sort-arrow-up {
  @apply mb-2;
  height: 0.1875rem;
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
