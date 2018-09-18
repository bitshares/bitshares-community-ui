<template>
  <input
    type="text"
    class="input focus:outline-none"
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

<style lang="scss">
  .input {
    @apply appearance-none border-b border-b-2 border-teal py-2 bg-transparent  w-full text-grey-darker py-1 px-2 leading-tight;
  }
</style>
