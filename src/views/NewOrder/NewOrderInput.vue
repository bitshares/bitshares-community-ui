<template>
  <div
    :class="{
      'new-order-input--left': aside === 'left',
      'new-order-input--right': aside === 'right'
    }"
    class="new-order-input"
  >
    <div class="new-order-input-title">{{ title }}</div>
    <SimpleInput
      v-model="value"
      :value-mode="true"
      :title="title"
      :placeholder="placeholder"
      :centered="true"
      type="number"
    />
    <div class="new-order-input-note">{{ note }}</div>
  </div>
</template>
<script>
import SimpleInput from '@/components/SimpleInput'

export default {
  components: {
    SimpleInput
  },
  props: {
    title: {
      type: String,
      default: 'Spend'
    },
    placeholder: {
      type: String,
      default: 'BTC'
    },
    note: {
      type: String,
      required: true
    },
    aside: {
      type: String,
      default: 'left'
    }
  },
  data() {
    return {
      value: this.placeholder
    }
  }
}
</script>
<style lang="scss">
  .new-order-input {
    text-align: center;
    width: 4.375rem;
    font-size: config('textSizes.xl');
    margin-top: -0.875rem;

    &--left {
      margin-left: 0.9375rem;
    }

    &--right {
      margin-right: 0.9375rem;
    }
  }
  .new-order-input-note {
    color: config('colors.primary');
    font-size: 0.6875rem;
    letter-spacing: normal;
  }

  .new-order-input-title {
    color: config('colors.inactive');
    font-size: 0.6875rem;
    letter-spacing: normal;
  }
</style>
