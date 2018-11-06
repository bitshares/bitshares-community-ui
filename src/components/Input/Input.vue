<template>
  <div
    :class="{
      'input--has-icon': icon,
      'input--has-error': hasError,
      'input--disabled': disabled
    }"
    class="input">

    <input
      v-restrict.number="isNumber"
      ref="input"
      :value="value"
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

    <!-- floating title = placeholder -->
    <span
      :class="{'input_has-content': !!value }"
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

    <!-- tip message -->
    <div
      v-if="tipText && !hasError"
      class="input__tip">
      {{ tipText }}
    </div>

    <!-- error message -->
    <div
      v-if="hasError && !errors.$pending"
      class="input__error">
      <div>{{ erroredMessage }}</div>
    </div>

  </div>
</template>

<script>
import '@/assets/icons/'
import debounce from 'lodash/debounce'
import messages from '@/helpers/inputMessages.js'

export default {
  props: {
    inputName: {
      type: String,
      required: true
    },
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
    // vuelidate validation object
    errors: {
      type: Object,
      required: true
    }
  },
  computed: {
    inputType() {
      if (this.type === 'password') return this.type
      if (this.type === 'number' || this.password) return 'tel'
      return 'text'
    },
    isNumber() {
      return this.type === 'number'
    },
    validationParams() {
      return Object.keys(this.errors.$params)
    },
    erroredMessage() {
      const param = this.validationParams.find(param => !this.errors[param])
      return this.validationMessages[param]
    },
    inputMessages() {
      return messages[this.inputName]
    },
    titleText() {
      return this.title || this.inputMessages.title
    },
    tipText() {
      return this.tip || this.inputMessages.tip
    },
    validationMessages() {
      return this.inputMessages.validation
    },
    hasError() {
      return this.errors.$dirty && this.errors.$invalid
    }
  },
  mounted() {
    if (this.autofocus) {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  },
  created() {
    this.$debouncedTouch = debounce(() => {
      this.errors.$touch()
    }, 300)
  },
  methods: {
    handleInput({ target: { value } }) {
      const newValue = this.isNumber ? (parseInt(value) || '') : value
      this.errors.$reset()
      this.$debouncedTouch()
      this.$emit('input', newValue + '')
    },
    // prevent pasting non-numbers if this is a number input
    handlePaste(event) {
      if (!this.isNumber) return
      event.preventDefault()
      const text = event.clipboardData.getData('text')
      const number = this.value + (parseInt(text) || null)
      this.$debouncedTouch()
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
    }
  }
}
</script>

<style lang="scss">

.input {
  position: relative;
  @apply pt-3 pb-4;
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
  top: 25px;
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
</style>
