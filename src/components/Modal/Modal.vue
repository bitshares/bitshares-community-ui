<template>
  <transition name="modal">
    <div
      class="modal-mask"
      @click.self.stop="$emit('close')"
    >
      <div
        class="modal-wrapper w-full sm:w-auto h-full sm:h-auto"
      >
        <svgicon
          class="modal-wrapper__close"
          width="12"
          height="12"
          color="rgba(255,255,255,0.5)"
          name="cancel"
          @click="$emit('close')"
        />
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
import '@icons/cancel'

export default {
  props: {
    widthAuto: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      required: false,
      default: 'auto'
    },
    height: {
      type: String,
      required: false,
      default: 'auto'
    }
  }
}
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .3s ease;
}

.modal-wrapper {
  transition: all .3s ease;
  position: relative;
  background: rgb(0, 0, 0);

  &--width-auto {
    width: auto;
  }
  &__close {
    cursor: pointer;
    position: absolute;
    right: 0.625rem;
    top: 0.4375rem;
    z-index: 2;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-wrapper,
.modal-leave-active .modal-wrapper {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
