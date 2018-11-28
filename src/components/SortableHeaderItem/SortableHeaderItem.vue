<template>
  <div
    :class="{
      'header-item--left-aligned': align === 'left',
      'header-item--center-aligned': align === 'center',
      'header-item--right-aligned': align === 'right',
      'header-item--large': large,
    }"
    :style="styleObject"
    class="header-item">
    <div
      :class="{'header-item__title--title-active': sort}"
      class="header-item__title"
    >
      <span
        :class="{'_inactive': doubleField}"
        @click="$emit('activate:double', '')"
      >
        {{ title }}
      </span>
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
      <span
        v-if="isDouble && doubleField"
        class="_inactive"
      >/</span>
      <span
        v-if="doubleField"
        @click="$emit('activate:double', doubleData.field)"
      >{{ doubleData.title }}</span>
    </div>
    <span
      v-if="isDouble && !doubleField"
      :class="{'_double-title--marginLeft-0': !showIcon || !sort}"
      class="_double-title"
      @click="$emit('activate:double', doubleData.field)"
    >
      /{{ doubleData.title }}
    </span>
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
    },
    large: {
      type: Boolean,
      required: true
    },
    isDouble: {
      type: Boolean,
      default: false
    },
    doubleData: {
      type: Object,
      default() {
        return {}
      }
    },
    doubleField: {
      type: String,
      default: ''
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
  &--large {
    font-size: config('textSizes.base');
  }
}

.header-item__title {
  position: relative;
  white-space: nowrap;
  letter-spacing: -0.0455rem;
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

._double-title {
  margin-left: 14px;
  display: inline-block;

  &--marginLeft-0 {
    margin-left: 0;
  }
}

._inactive {
  color: config('colors.inactive');
}
</style>
