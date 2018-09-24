<template>
  <div
    class="input"
    :class="{
      'input--hasicon': icon,
      'input--haserror': error,
      'input--disabled': disabled
    }">

    <svgicon
      v-if="icon"
      class="input__icon"
      :name="icon"
      width="24"
      height="24"
    />

    <input
      class="input__input"
      ref="input"
      v-restrict.number="isNumber"
      type="text"
      :value="value"
      :disabled="disabled"
      @paste="handlePaste"
      @input="handleInput"
      @blur="handleBlur"
      @keyup.enter="$refs.input.blur"
    >

    <!-- floating title = placeholder -->
    <span
      class="input__title"
      :class="{input_hascontent: !!value }">
      {{ title }}
    </span>

    <!-- error message -->
    <div class="input__error" v-if="error">{{ error }}</div>

  </div>
</template>

<script lang="ts">
// import '@icons'

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
      required: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
  },
  computed: {
    isNumber () {
      return this.type === 'number'
    }
  },
  mounted () {
    if (this.autofocus) this.$refs.input.focus()
  },
  methods: {
    handleInput ({ target: { value } }) {
      const newValue = this.isNumber ? (parseInt(value) || null) : value
      this.$emit('input', newValue)
    },
    handlePaste (event) {
      if (!this.isNumber) return
      event.preventDefault()
      const text = event.clipboardData.getData('text')
      const number = this.value + (parseInt(text) || null)
      this.$emit('input', number)
    },
    handleBlur () {
      this.$emit('blur', this.$refs.input.value)
    }
  }
}
</script>

<style scoped lang="scss">

.input {
  position: relative;
  padding-top: 12px;
  padding-bottom: 16px;
}

.input__icon {
  margin-bottom: 2px;
  position: absolute;
  top: 26px;
  left: 0;
}

.input__input {
  font-size: 24px;
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 5px 0;
  background-color: transparent;
  background-image: none;
  border: none;
  border-bottom: 1px solid #ced2d6;
  box-shadow: none !important;
  transition: border-color ease-in-out 0.15s;
  color:black;
  z-index: 2;
  position: relative;
  &:disabled {
    opacity: 0.3;
    user-select: none;
    pointer-events: none;
  }
  &:focus {
    outline: 0 !important;
    border-color: #0083ca;
  }
  .title {
    color: #a0a6ad;
    letter-spacing: 0.3px;
  }
}
.input--hasicon .input__input {
  padding-right: 30px;
}
.input--haserror .input__input {
  border-color: #e24640;
}
.input__title {
  font-size: 16px;
  position: absolute;
  top: 26px;
  left: 0;
  line-height: 1.5;
  color: #a0a6ad;
  transition: all 0.3s;
  pointer-events: none;
  z-index: 1;
  text-transform: uppercase;
}

.input__title.input_hascontent,
.input__input:focus + .input__title {
  top: 6px;
  opacity: 0.8;
  font-size: 10px;
}

.input__error {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
  color: #e24640;
}
</style>
