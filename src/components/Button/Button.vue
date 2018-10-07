<template>
  <button
    :class="{
      'btn--loading': loading,
      'btn--disabled': disabled,
      'btn--small':size === 'small',
      'btn--big': size === 'big',
      'btn--wide': width === 'full',
      'btn--round': type === 'round',
    }"
    :disabled="disabled"
    class="btn btn-blue"
    @click="$emit('click')"
  >
    {{ text }}
    <Spinner
      v-if="loading"
      size="small"
    />
  </button>
</template>

<script>
import Spinner from '@/components/Spinner/Spinner.vue'

export default {
  name: 'Button',
  components: {
    Spinner
  },
  props: {
    /** Sets button text
     */
    text: {
      type: String,
      default: ''
    },
    /** Sets disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /** Sets loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    /** Sets size state
     */
    size: {
      type: String,
      default: 'normal'
    },
    /** Sets width state
     */
    width: {
      type: String,
      default: 'standard'
    },
    /** Sets loading state
     */
    type: {
      type: String,
      default: 'standard'
    }
  }
}
</script>

<style lang="scss">
.btn {
  @apply py-4 px-4 text-lg font-gotham-medium;
  color: config('colors.button-text');
  background-color: config('colors.button-bg');
  text-transform: uppercase;
  transition: background-color 0.2s, opacity 0.2s;
  &:hover {
    background-color: config('colors.button-bg-hover');
  }
  &:focus {
    outline:none;
  }
}
.btn--disabled {
  @apply pointer-events-none opacity-40;
  color: config('colors.button-text-disabled');
}
.btn--small {
  @apply py-1 pr-1 cursor-pointer text-xs;
}
.btn--big {
  @apply py-2 px-2 cursor-pointer text-2xl;
}
.btn--loading {
  @apply pointer-events-none;
}
.btn--wide {
  @apply w-full;
}
.btn--round {
  @apply rounded;
}
</style>
