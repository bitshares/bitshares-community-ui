<template>
  <div
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
    }
  }
}
</script>
<style lang="scss">
  .new-order-input {
    text-align: center;
    width: 6.475rem;
    font-size: config('textSizes.xl');
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
