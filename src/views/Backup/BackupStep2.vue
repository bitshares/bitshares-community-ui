<template>
  <div class="backup-step">
    <div class="backup-step-title">backup</div>
    <div class="backup-step-subtitle">You need to backup account before using it</div>
    <div class="backup-step-content">
      <div class="backup-step-content-confirm">SCREENSHOTS ARE NOT SECURE</div>
      <div class="backup-step-content-item">Never make a digital copy of your</div>
      <div class="backup-step-content-item">backup phrase and never upload it</div>
      <div class="backup-step-content-item">online. You can make a safe backup</div>
      <div class="backup-step-content-item">only with physical paper and a pen</div>
    </div>
    <div
      class="backup-step-button"
      @click.stop="$emit('change', 3)"
    >I understand
    </div>
  </div>
</template>

<script>
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
    padding-top: 1.125rem;
    padding-bottom: 1.125rem;
    box-sizing: border-box;
    margin-top: 11.07rem;
    background-color: #6d6e70;
    font-size: 1.125rem;
    box-sizing: border-box;
  }
  .backup-step-content-item {
    font-weight: config('fontWeights.semibold');
    line-height: 1.2;
  }
  .backup-step-content-confirm {
    text-transform: uppercase;
    font-family: config('fonts.gotham-medium');
    color: config('colors.bg-base');
    font-weight: config('fontWeights.medium');
    margin-bottom: 0.625rem;
  }
  .backup-step-button {
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
