<template>
  <div
    :class="{
      'header-item--left-aligned': align === 'left',
      'header-item--center-aligned': align === 'center',
      'header-item--right-aligned': align === 'right',
    }"
    :style="styleObject"
    class="header-item">
    <div
      :class="sort ? 'header-item__title--title-active' : ''"
      class="header-item__title">
      {{ title }}
      <div
        v-if="showIcon && sort"
        class="header-item__arrows">
        <svgicon
          :class="sort === 'desc' ? 'active' : ''"
          class="sort-arrow-up"
          name="sortArrow"
        />
        <svgicon
          :class="sort === 'asc' ? 'active' : ''"
          class="sort-arrow-down"
          name="sortArrow"
        />
      </div>
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
    },
    align: {
      type: String,
      default: 'right'
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    paddingLeft: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    styleObject() {
      return {
        'padding-left': `${this.paddingLeft}rem`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-item {
  font-size: config('textSizes.xs-sm');
  display: flex;
  justify-content: flex-end;
  color: config('colors.inactive');
  cursor: pointer;
  user-select: none;
  position: relative;
  &--left-aligned {
    justify-content: flex-start;
  }
  &--center-aligned {
    justify-content: center;
  }
  &--right-aligned {
    justify-content: flex-end;
  }
}

.header-item__title {
  position: relative;
  white-space: nowrap;
}

.header-item__arrows {
  position: absolute;
  top: 0;
  left: 100%;
}

.sort-arrow-up {
  @apply mb-2;
  height: 0.1875rem;
  color: config('colors.inactive');
}

.sort-arrow-down {
  @apply -ml-4 mt-1;
  height: 0.1875rem;
  transform: rotate(-180deg);
  color: config('colors.inactive');
}

.active {
  color: config('colors.text-primary');
}

.header-item__title--title-active {
  color: config('colors.text-primary');
}
</style>
