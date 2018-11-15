<template>
  <button
    :class="{
      'btn--loading': loading,
      'btn--disabled': disabled,
      'btn--small':size === 'small',
      'btn--big': size === 'big',
      'btn--wide': width === 'full',
      'btn--round': type === 'round',
      'btn--secondary': type === 'secondary'
    }"
    :disabled="disabled"
    class="btn btn-blue"
    @click="$emit('click')"
  >
    <Loader
      v-if="loading"
      color="black"
    />
    <span v-else>
      {{ text }}
    </span>
  </button>
</template>

<script>
import Loader from '@/components/Loader/'

export default {
  name: 'Button',
  components: {
    Loader
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
      default: 'primary'
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 51px;
  transition: background-color 0.2s, opacity 0.2s;
  &:hover {
    background-color: config('colors.button-bg-hover');
  }
  &:focus {
    outline:none;
  }
}
.btn--disabled {
  @apply pointer-events-none;
  color: config('colors.button-text-disabled');
  background-color: config('colors.button-bg-disabled');
}
.btn--small {
  @apply py-1 pr-4 cursor-pointer text-xs;
}
.btn--big {
  @apply py-2 px-6 cursor-pointer text-2xl;
}
.btn--loading {
  @apply pointer-events-none;
  background-color: config('colors.button-bg-loading');
}
.btn--wide {
  @apply w-full;
}
.btn--round {
  @apply rounded;
}
.btn--secondary {
  background-color:config('colors.bg-base');
  color: config('colors.primary');
  padding-top: 14px;
  padding-bottom: 14px;
  border: solid;
  border-width: 1px;
  border-color:config('colors.primary');
}
.btn--secondary:hover {
  background-color:config('colors.primary');
  color:config('colors.bg-base');
}
.spinner {
  margin-right: 10px;
}

</style>
