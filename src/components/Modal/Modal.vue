<template>
  <transition name="modal">
    <div
      class="modal-mask"
      @click.self.stop="$emit('close')"
    >
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot name="body"/>
          <div
            class="modal-close"
            @click="$emit('close')">
            <svgicon :name="'cancel'"/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import '@icons/cancel'

export default {
}
</script>
<style lang="scss">
.modal-wrapper {
  width: config('screens.md');
  height: auto;
  position: relative;
  background-color: config('colors.black');

}
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

.modal-close {
  position: absolute;
  right: -10px;
  top: -35px;
  opacity: .7;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

.modal-container {
  margin: 0px auto;
  padding: 5px;
  transition: all .3s ease;
  background: config('colors.bg-base');
  opacity: 1;
  z-index: 1000;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
