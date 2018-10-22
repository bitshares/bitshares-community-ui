<template>
  <input
    class="search-input"
    v-model.trim="searchValue"
    :placeholder="hint || placeholder"
    @input="onChange({ value: searchValue })"
  >
</template>

<script>
export default {
  data() {
    return {
      searchValue: '',
      placeholder: 'Search'
    }
  },
  props: {
    hint: {
      type: String,
      default: ''
    },
    onChange: {
      type: Function,
      default() {
        return () => {}
      },
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .search-input {
    width: 150px;
    border: none;
    outline: none;
    background: config('colors.card-background');
    color: config('colors.white');
    border-bottom: 1px solid #7a7675;
  }
</style>
