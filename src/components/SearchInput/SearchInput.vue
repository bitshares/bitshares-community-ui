<template>
  <div class="input-wrapper">
    <input
      :placeholder="hint || placeholder"
      :value="value"
      :class="{'search-input--active': value.length }"
      class="search-input"
      @input="$emit('input', $event.target.value)"
      @focus="inputMode = true"
      @blur="inputMode = false"
    >
    <div class="search-icon">
      <svgicon
        v-if="!inputMode"
        width="20"
        height="20"
        name="search"
      />
    </div>
    <div class="search-clear">
      <svgicon
        v-if="inputMode && value.length"
        width="14"
        height="14"
        name="cancel"
        @click="$emit('input', $event.target.value)"
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
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      placeholder: 'Search',
      inputMode: false
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
