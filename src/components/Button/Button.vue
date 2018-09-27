<template>
  <button
    :class="{
      'btn--loading': loading,
      'btn--disabled': disabled,
      'btn--small':size === 'small',
      'btn--big': size === 'big',
      'btn--wide': width === 'full',
      'btn--round':type==='round',
    }"
    :disabled="disabled"
    class="btn btn-blue"
    @click="$emit('click')"
  >
    {{ text }} <Spinner
      v-if="loading"
      size="small" />
  </button>
</template>

<script>
import Spinner from '../Spinner/Spinner.vue'

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
      default: 'round'
    }
  }
}
</script>

<style lang="scss">
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue text-white;
}
.btn-blue:hover {
  @apply bg-blue-dark;
}
.btn-blue:active {
  @apply bg-blue;
}
.btn--disabled {
  @apply pointer-events-none opacity-50 cursor-not-allowed;
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
