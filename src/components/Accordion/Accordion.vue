<template>
  <div class="accordion">
    <div
      v-for="(item, index) in items"
      :key="index"
      :style="calcStyleObject(item === active)"
      class="accordion-item"
      @click="$emit('change', item)"
    >
      <div
        :class="{'accordion-item-header--active' : item === active }"
        class="accordion-item-header"
      >
        {{ item }}
        <svgicon
          class="collapse-accordion-btn"
          width="11"
          height="11"
          name="arrowDown"
        />
      </div>
      <transition name="fade">
        <div
          v-if="item === active"
          class="accordion-item-content"
        >
          <slot :name="item"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      default: () => ['New Order', 'Order Book', 'Active Orders', 'History']
    },
    active: {
      type: String,
      required: true
    }
  },
  methods: {
    calcStyleObject(isActive) {
      const maxHeight = this.$el ? this.$el.clientHeight - (this.items.length - 1) * 40 : '100%'
      return {
        height: isActive ? `${maxHeight}px` : '2.5rem'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .accordion {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .accordion-item {
    min-height: 2.5rem;
    flex-shrink: 1;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: height 0.2s;
  }
  .accordion-item-header {
    padding: 0 1rem;
    color: config('colors.primary');
    font-size: 0.9375rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    min-height: 2.5rem;
    cursor: pointer;
    .collapse-accordion-btn {
      opacity: 0.5;
      transition: transform 0.2s;
      transform: rotate(-90deg);
    }
    &--active {
      font-weight: 600;
      .collapse-accordion-btn {
        transform: none;
      }
    }
  }
  .accordion-item-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
