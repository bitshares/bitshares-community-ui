<template>
  <div class="input-wrapper">
    <input
      v-model="value"
      :placeholder="hint || placeholder"
      :class="{'search-input--active': value.length }"
      class="search-input"
      @input="$emit('input', value)"
      @focus="inputMode = true"
      @blur="inputMode = false"
    >
    <div
      v-if="!inputMode && !value.length"
      class="search-icon"
    >
      <svgicon
        width="20"
        height="20"
        name="search"
      />
    </div>
    <div
      v-if="value.length"
      class="search-clear"
    >
      <svgicon
        width="14"
        height="14"
        name="cancel"
        @click="$emit('input', ''); value = ''"
      />
    </div>
    <!-- <Input
      :title="hint || placeholder"
      :value="value"
      input-name="search"
      @input="$emit('input', $event)"
    > -->
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
    }
  },
  data() {
    return {
      placeholder: 'Search',
      inputMode: false,
      value: ''
    }
  }
}
</script>

<style scoped lang="scss">
  .search-input {
    width: 9.375rem;
    padding-right: 1.65rem;
    border: none;
    outline: none;
    background: transparent;
    color: config('colors.text-primary');
    border-bottom: 0.0625rem solid #7a7675;
    visibility: hidden;
    font-size: .875rem;

    &--active {
      visibility: visible;
    }
  }
  .search-icon {
    display: inline-block;
    position: absolute;
    bottom: .3rem;
    right: .3rem;
    opacity: .5;
  }
  .search-clear {
    display: inline-block;
    position: absolute;
    bottom: .3rem;
    right: .3rem;
    opacity: .5;
  }
  .input-wrapper {
    position: relative;
    &:hover {
      cursor: pointer;

      .search-icon {
        opacity: 1;
      }
      .search-clear {
        opacity: 1;
      }
      .search-input {
        visibility: visible;
      }
    }
  }
</style>
