<template>
  <button @click="$emit('click')" class="btn btn-blue" :class="{'btn--disabled': disabled, 'btn--small':size === 'small', 'btn--big': size === 'big'}"
    :isLoading=loading
    :disabled=disabled>
 {{ text }} <Loader v-if=loading size="medium" />
  </button>
</template>

<script>
import Loader from './Loader.vue'

export default {
  name: 'Button',
  props: {
    /** Sets button text
     */
    text: {
      type: String,
      default: 'Button'
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
      default: 'full'
    },
    /** Sets loading state
     */
    type: {
      type: String,
      default: 'round'
    },
    callback: {
      type: Function
    }
  },
  components: {
    Loader
  },
  methods: {

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
  opacity: 0.65;
  cursor: not-allowed;
}
.btn--small {
  padding:5px;
  font-size: 10px;
}
.btn--big {
  padding:10px;
  font-size: 25px;
}
</style>
