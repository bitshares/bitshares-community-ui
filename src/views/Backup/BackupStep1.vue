<template>
  <div class="backup-step">
    <div class="backup-step-title">backup</div>
    <div class="backup-step-subtitle">You need to backup account before using it</div>
    <svgicon
      class="backup-step-icon"
      name="safe"
      width="100"
      height="100"
      color="rgba(255,255,255,0.5)"
    />
    <div class="backup-step-content">
      <div class="backup-step-content-item">Are you being watched?</div>
      <div class="backup-step-content-item">Nearby windows?</div>
      <div class="backup-step-content-item">Hidden cameras?</div>
      <div class="backup-step-content-item">Shoulder-spies?</div>
    </div>
    <div
      class="backup-step-button"
      @click="$emit('change', 2)"
    >Continue to backup</div>
  </div>
</template>

<script>
import '@icons/safe'

export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  .backup-step {
    text-align: center;
    font-family: config('fonts.gotham');
  }
  .backup-step-title {
    margin-top: 0.9375rem;
    text-transform: uppercase;
    font-family: config('fonts.gotham-medium');
    font-size: config('textSizes.lg');
  }
  .backup-step-subtitle {
    margin: 0.9375rem auto 0;
    width: 15.9375rem;
    font-weight: config('fontWeights.semibold');
    font-size: config('textSizes.lg');
    text-align: center;
  }
  .backup-step-content {
    margin-top: 3.25rem;
    font-weight: config('fontWeights.semibold');
  }
  .backup-step-content-item {
    line-height: 1.3;
    font-size: 1.55rem;
  }
  .backup-step-button {
    margin-top: 1.2rem;
    box-sizing: border-box;
    width: 27.5rem;
    height: 3rem;
    line-height: 3rem;
    background-color: config('colors.white');
    text-align: center;
    color: config('colors.button-text');
    font-family: config('fonts.gotham-medium');
    text-transform: uppercase;
    cursor: pointer;
  }
  .backup-step-icon {
    margin-top: 30px;
  }
</style>
