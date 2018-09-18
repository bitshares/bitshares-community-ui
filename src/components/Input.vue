<template>
  <input
    type="text"
    :value="value"
    @input="handleInput"
  />
</template>

<script>

export default {
  name: 'Input',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    handleInput ({ target }) {
      this.$emit('input', target.value)
    }
  }
}
</script>
