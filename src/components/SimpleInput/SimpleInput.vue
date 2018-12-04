<template>
  <div
    :class="{
      'input--has-icon': icon,
      'input--has-error': error,
      'input--disabled': disabled,
      'input--centered': centered,
      'input--value-mode': valueMode
    }"
    class="input">

    <input
      v-restrict.number.decimal="isNumber"
      ref="input"
      :value="value"
      :placeholder="usedPlaceholder"
      :type="inputType"
      :disabled="disabled"
      :autocorrect="false"
      :autocomplete="false"
      :spellcheck="false"
      class="input__input"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @paste="handlePaste"
      @keyup.enter="$refs.input.blur"
    >

    <!-- floating title -->
    <span
      v-if="!valueMode"
      :class="{'input_has-content': !! value }"
      class="input__title">
      {{ titleText }}
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

    <!-- clear (cross) icon -->
    <svgicon
      v-if="value && !icon && !valueMode"
      name="cross"
      class="delete__icon"
      width="12"
      height="12"
      @click.stop.native="handleClear"
    />

    <!-- tip message -->
    <div
      v-if="tipText && !error"
      class="input__tip">
      {{ tipText }}
    </div>

    <!-- error message -->
    <div
      v-if="error"
      class="input__error">
      <div>{{ error }}</div>
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
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: false,
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
    tip: {
      type: String,
      default: ''
    },
    password: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    valueMode: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputType() {
      if (this.type === 'password') return this.type
      if (this.type === 'number' && this.password) return 'tel'
      return 'text'
    },
    usedPlaceholder() {
      if (this.valueMode) {
        return this.placeholder
      }
      return this.title ? '' : this.placeholder
    },
    isNumber() {
      return this.type === 'number'
    },
    titleText() {
      return this.title
    },
    tipText() {
      return this.tip
    }
  },
  mounted() {
    if (this.autofocus) {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  },
  methods: {
    handleInput({ target: { value } }) {
      const newValue = this.isNumber ? (parseFloat(value) || null) : value
      this.$emit('input', newValue)
    },
    // prevent pasting non-numbers if this is a number input
    handlePaste(event) {
      if (!this.isNumber) return
      event.preventDefault()
      const text = event.clipboardData.getData('text')
      const number = this.value + (parseFloat(text) || null)
      this.$emit('input', number)
    },
    handleFocus() {
      this.$emit('focus')
    },
    handleBlur() {
      this.$emit('blur', this.$refs.input.value)
    },
    handleIconClick() {
      this.$emit('icon-click')
    },
    handleClear() {
      this.$emit('input', this.isNumber ? null : '')
    }
  }
}
</script>

<style lang="scss">

.input {
  position: relative;
  @apply pt-3 pb-4;

  &--centered {
    .input__input {
      text-align: center;
    }
  }
}

.input__icon {
  position: absolute;
  top: 16px;
  right: 0;
  cursor: pointer;
}

.delete__icon {
  color: config('colors.text-primary');
  position: absolute;
  top: 22px;
  right: 0;
  cursor: pointer;
}

.input__input {
  @apply text-2xl;
  @apply pt-1 px-0 pb-0;
  color: config('colors.text-primary');
  width: 100%;
  border-radius: 0;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid config('colors.input-border');
  box-shadow: none !important;
  text-overflow: ellipsis;
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
  &[type=tel] {
    -webkit-text-security: disc;
  }
  .title {
    color: #a0a6ad;
    letter-spacing: 0.3px;
  }
}

.input__input {
  @apply pr-4;
}

.input--has-icon .input__input {
  @apply pr-8;
}

.input--has-error .input__input {
  border-color: config('colors.text-error');
}
.input__title {
  @apply text-base;
  color: config('colors.text-primary');
  position: absolute;
  top: 22px;
  left: 0;
  transition: all 0.3s;
  pointer-events: none;
  text-transform: uppercase;
  user-select: none;
}

.input__title.input_has-content,
.input__input:focus + .input__title {
  @apply text-xxs;
  color: config('colors.input-title-active');
  top: 5px;
  opacity: 0.8;
}

.input__error,
.input__tip {
  @apply text-xs -mt-3;
  position: absolute;
  top: 100%;
  left: 0;
  color: config('colors.text-error');
}

.input__tip {
  color: config('colors.text-primary');
}
.input--value-mode {
  padding: 0;

  .input__input {
    padding-right: 0;
    outline: none;
    border-bottom: none;
    font-size: config('textSizes.xl');
  }
}
</style>
