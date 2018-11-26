<template>
  <div class="loading-container">
    <transition
      name="fade"
      mode="out-in">
      <div
        v-if="loading"
        key="1"
        class="spinner-container">
        <div class="spinner" />
      </div>
      <div
        v-else
        key="2"
        class="loading-container__content">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script>
export default ({
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes rotating {
  100% {
    transform: rotate(360deg);
  }
}

.loading-container {
  height: 100%;
  overflow: hidden;
}

.loading-container__content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40%;
}
.spinner {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #555;
  animation: rotating 1s infinite linear;
}
</style>
