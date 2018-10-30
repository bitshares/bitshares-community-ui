<template>
  <div class="input-wrapper">
    <input
      :placeholder="hint || placeholder"
      :value="value"
      :class="{'search-input--active': value.length }"
      class="search-input"
      @input="$emit('input', $event.target.value)"
    >
    <div class="search-icon">
      <svgicon name="search"/>
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
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      placeholder: 'Search'
    }
  }
}
</script>

<style scoped lang="scss">
  .search-input {
    width: 9.375rem;
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
  .search-cleaner {
    display: inline-block;
    width: 0.8125rem;
    height: 0.8125rem;
    position: absolute;
    top: 0.0625rem;
    right: 1.25rem;
    transform: scale(.7, .7);

    &:hover {
      cursor: pointer;
      color: #7a7675;
    }
  }
  .search-icon {
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    position: relative;
    top: 0.0625rem;
    opacity: .5;
    right: .95rem;
  }
  .input-wrapper {
    &:hover {
      cursor: pointer;

      .search-icon {
        opacity: 1;
      }

      .search-input {
        visibility: visible;
      }
    }
  }
</style>
