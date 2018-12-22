<template>
  <div
    class="new-order-input"
  >
    <div class="new-order-input-title">{{ title }}</div>
    <SimpleInput
      :value="value"
      :value-mode="true"
      :title="title"
      :placeholder="placeholder"
      :centered="true"
      :disabled="disabled"
      :max-chars="9"
      type="number"
      @input="handleChange"
    />
    <div
      :class="{'new-order-input-note--error': error }"
      class="new-order-input-note"
      @click="$emit('note-click')"
    >
      {{ note }}
    </div>
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
      type: [String, Number],
      default: 'BTC'
    },
    note: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: null
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss">
  .new-order-input {
    text-align: center;
    min-width: 6rem;
    width: 8.5rem;
    font-size: config('textSizes.xl');
  }
  .new-order-input-note {
    color: config('colors.primary');
    font-size: config('textSizes.xxs-xs');
    letter-spacing: normal;
    cursor: pointer;
    &--error {
      color: config('colors.text-error');
    }
  }

  .new-order-input-title {
    color: config('colors.inactive');
    font-size: 0.6875rem;
    // letter-spacing: normal;
  }
</style>
