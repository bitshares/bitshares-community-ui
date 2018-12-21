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
      :class="{'header-item__title--title-active': currentField === item.field }"
      class="header-item__title"
      @click="$emit('change', item.field)"
    >
      {{ item.title }}
      <div
        v-if="showIcon && sort && currentField === item.field"
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
    <!--SECOND FIELD-->
    <span v-if="secondFieldActive || secondFieldNotActive">/</span>
    <div
      v-if="item.secondTitle"
      :class="{
        'header-item__title--title-active': currentField === item.secondField,
        'header-field-m-left': (item.secondField && (currentField === item.field))
      }"
      class="header-item__title"
      @click="$emit('change', item.secondField)"
    >
      <span v-if="item.secondField && currentField === item.field">/</span>
      {{ item.secondTitle }}
      <div
        v-if="showIcon && sort && currentField === item.secondField"
        class="header-item__arrows"
      >
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
    item: {
      type: Object,
      required: true
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
    currentField: {
      type: String,
      default: ''
    }
  },
  computed: {
    styleObject() {
      return {
        'padding-left': `${this.paddingLeft}rem`
      }
    },
    secondFieldActive() {
      return this.item.secondField && this.currentField === this.item.secondField
    },
    secondFieldNotActive() {
      return this.item.secondField && (this.currentField !== this.item.field) && (this.currentField !== this.item.secondField)
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
  &--disabled {
    cursor: default;
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

.header-field-m-left {
  margin-left: 1rem;
}

.active {
  color: config('colors.text-primary');
}

.header-item__title--title-active {
  color: config('colors.text-primary');
}
</style>
