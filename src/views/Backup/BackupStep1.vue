<template>
  <div class="backup-step">
    <div class="backup-step-title">backup</div>
    <div class="backup-step-subtitle">You need to backup account before using it</div>
    <div class="backup-step-content">
      <div class="backup-step-content-item">Are you being watched?</div>
      <div class="backup-step-content-item">Nearby windows?</div>
      <div class="backup-step-content-item">Hidden cameras?</div>
      <div class="backup-step-content-item">Shoulder-spies?</div>
    </div>
    <div class="backup-step-button">Continue to backup</div>
  </div>
</template>

<script>
import '@icons/accountBackupIcoSafe'
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss">
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
    font-size: config('textSizes.lg');
    text-align: center;
  }
  .backup-step-content {
    margin-top: 11.25rem;
    font-size: 1.6875rem;
  }
  .backup-step-button {
    margin-top: 1.25rem;
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
</style>
