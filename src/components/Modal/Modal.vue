<template>
  <transition name="modal">
    <div
      class="modal-mask"
      @click.self.stop="$emit('close')"
    >
      <div class="modal-wrapper">
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>

export default {}
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
  width: 56rem;
  transition: all .3s ease;
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
