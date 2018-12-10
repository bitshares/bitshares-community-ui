<template>
  <button
    :class="{
      'btn--loading': loading,
      'btn--disabled': disabled,
      'btn--small':size === 'small',
      'btn--big': size === 'big',
      'btn--wide': width === 'full',
      'btn--round': type === 'round',
      'btn--secondary': type === 'secondary',
      'btn--buy': type === 'buy',
      'btn--sell': type === 'sell',
      'btn--faded': type === 'faded',
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
      <slot />
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
  &.btn--buy {
    color: rgba(0,0,0,.5);
    background-color: config('colors.buy-disabled');
    &:hover {
      background-color: config('colors.buy-disabled');
    }
  }
  &.btn--sell {
    color: rgba(0,0,0,.5);
    background-color: config('colors.sell-disabled');
    &:hover {
      background-color: config('colors.sell-disabled');
    }
  }
}
.btn--small {
  @apply py-1 pr-4 cursor-pointer text-xs;
  height: 2rem;
  min-width: 6.785rem;
  font-size: 0.9rem;
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
  background-color: transparent;
  color: config('colors.primary');
  padding-top: 1px;
  padding-bottom: 1px;
  border: solid;
  border-width: 1px;
  opacity: 0.8;
  border-color:config('colors.primary');
  // font-family: Gotham_Pro;
}
.btn--secondary:hover {
  background-color:config('colors.primary');
  color:config('colors.bg-base');
  opacity: 1;
}
.btn--buy {
  background-color: config('colors.buy');
  &:hover {
    background-color: config('colors.buy');
  }
}
.btn--sell {
  background-color: config('colors.sell');
  &:hover {
    background-color: config('colors.sell');
  }
}
.btn--faded {
  background-color: config('colors.card-background');
  font-size: config('textSizes.lg');
  &:hover {
    background-color: config('colors.card-background');
  }
  color: config('colors.inactive');
}
.spinner {
  margin-right: 10px;
}

</style>
