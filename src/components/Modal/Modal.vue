<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot name="body"></slot>
          <button
            class="modal-default-button"
            @click="$emit('close')"
          >ok
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
}
</script>
<style lang="scss">
.modal-wrapper {
  width: 800px;
  height: 300px;
  position: relative;
  backround-color: config('colors.black')
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .3s ease;
}

.modal-container {
  margin: 0px auto;
  padding: 5px;
  transition: all .3s ease;
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
