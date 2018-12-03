<template>
  <div
    :class="{
      'new-order-input--left': aside === 'left',
      'new-order-input--right': aside === 'right'
    }"
    class="new-order-input"
  >
    <SimpleInput
      v-model="value"
      :value-mode="true"
      :title="title"
      :note="note"
      :placeholder="placeholder"
      type="number"
    />
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
    width: 4.375rem;
    font-size: config('textSizes.xl');
    margin-top: -0.875rem;

    &--left {
      margin-left: 2.5rem;
    }

    &--right {
      margin-right: 0.9375rem;
    }
  }
</style>
