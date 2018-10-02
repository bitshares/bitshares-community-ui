<template>
  <div
    :class="{
      'input--hasicon': icon,
      'input--haserror': error,
      'input--disabled': disabled
    }"
    class="input">

    <input
      v-restrict.number="isNumber"
      ref="input"
      :value="value"
      :disabled="disabled"
      :type="inputType"
      class="input__input"
      @paste="handlePaste"
      @input="handleInput"
      @blur="handleBlur"
      @keyup.enter="$refs.input.blur"
    >

    <!-- floating title = placeholder -->
    <span
      :class="{input_hascontent: !!value }"
      class="input__title">
      {{ title }}
    </span>

    <svgicon
      v-if="icon"
      :name="icon"
      color="white"
      class="input__icon"
      width="24"
      height="24"
      @click.stop.native="handleIconClick"
    />

    <!-- tip message -->
    <div
      v-if="tip && !error"
      class="input__tip">
      {{ tip }}
    </div>

    <!-- error message -->
    <div
      v-if="error"
      class="input__error">
      {{ error }}
    </div>

  </div>
</template>

<script>
import '@/assets/icons/'

export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputType() {
      return this.type === 'password' ? this.type : 'text'
    },
    isNumber() {
      return this.type === 'number'
    }
  },
  mounted() {
    if (this.autofocus) this.$refs.input.focus()
  },
  methods: {
    handleInput({ target: { value } }) {
      const newValue = this.isNumber ? (parseInt(value) || null) : value
      this.$emit('input', newValue)
    },
    // prevent pasting non-numbers if this is a number input
    handlePaste(event) {
      if (!this.isNumber) return
      event.preventDefault()
      const text = event.clipboardData.getData('text')
      const number = this.value + (parseInt(text) || null)
      this.$emit('input', number)
    },
    handleBlur() {
      this.$emit('blur', this.$refs.input.value)
    },
    handleIconClick() {
      this.$emit('icon-clicked')
    }
  }
}
</script>

<style scoped lang="scss">

.input {
  position: relative;
  @apply pt-3 pb-4 mb-2;
}

.input__icon {
  position: absolute;
  top: 16px;
  right: 0;
  cursor: pointer;
}

.input__input {
  @apply text-2xl;
  @apply pt-1 px-0 pb-0;
  color: config('colors.text-primary');
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid config('colors.input-border');
  box-shadow: none !important;
  transition: border-color ease-in-out 0.15s;
  &:disabled {
    opacity: 0.3;
    user-select: none;
    pointer-events: none;
  }
  &:focus {
    outline: 0 !important;
    border-color: config('colors.text-primary');
  }
  .title {
    color: #a0a6ad;
    letter-spacing: 0.3px;
  }
}
.input--hasicon .input__input {
  @apply pr-8;
}
.input--haserror .input__input {
  border-color: config('colors.text-error');
}
.input__title {
  @apply text-base;
  color: config('colors.text-primary');
  position: absolute;
  top: 25px;
  left: 0;
  transition: all 0.3s;
  pointer-events: none;
  text-transform: uppercase;
  user-select: none;
}

.input__title.input_hascontent,
.input__input:focus + .input__title {
  @apply text-xxs;
  top: 5px;
  opacity: 0.8;
}

.input__error {
  @apply text-xs;
  position: absolute;
  bottom: -1px;
  left: 0;
  color: config('colors.text-error');
}

.input__tip {
  @apply text-xs;
  position: absolute;
  bottom: -1px;
  left: 0;
  color: config('colors.text-primary');
}
</style>
