<template>
  <div class="input-wrapper">
    <input
      v-model.trim="searchValue"
      :placeholder="hint || placeholder"
      class="search-input"
      @input="onChange({ value: searchValue })"
    >
    <div
      v-if="searchValue.length"
      class="search-cleaner"
      @click="clear"
    >
      <svgicon :name="'cancel'"/>
    </div>
    <div class="search-icon">
      <svgicon :name="'search'"/>
    </div>
  </div>
</template>

<script>
import '@icons/search'
import '@icons/cancel'

export default {
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
  },
  data() {
    return {
      searchValue: '',
      placeholder: 'Search'
    }
  },
  methods: {
    clear() {
      this.searchValue = ''
      this.onChange({ value: '' })
    }
  }
}
</script>

<style scoped lang="scss">
  .search-input {
    width: 150px;
    border: none;
    outline: none;
    background: transparent;
    color: config('colors.white');
    border-bottom: 1px solid #7a7675;
  }
  .search-cleaner {
    display: inline-block;
    width: 13px;
    height: 13px;
    position: absolute;
    top: 1px;
    right: 20px;
    transform: scale(.7, .7);

    &:hover {
      cursor: pointer;
      color: #7a7675;
    }
  }
  .search-icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    transform: scale(.8, .8);
    position: absolute;
    top: 1px;
    right: 4px;
  }
</style>
