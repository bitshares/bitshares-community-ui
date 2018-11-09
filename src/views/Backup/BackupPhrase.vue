<template>
  <div class="backup-step">
    <div class="backup-step-title">backup</div>
    <div class="backup-step-subtitle">Please carefully write down this phrase</div>
    <div class="backup-step-content">
      <div class="backup-step-word">electric</div>
      <div class="backup-step-word">animal</div>
      <div class="backup-step-word">breakfast</div>
      <div class="backup-step-word">checken</div>
      <div class="backup-step-word">bitcoin</div>
      <div class="backup-step-word">money</div>
      <div class="backup-step-word">car</div>
      <div class="backup-step-word">city</div>
      <div class="backup-step-word">children</div>
      <div class="backup-step-word">carrot</div>
    </div>
    <div class="backup-step-content-item">We’ll confirm on the next screen</div>
    <div class="backup-step-button">i’ve written it down</div>
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
    width: 21.875rem;
    font-weight: config('fontWeights.semibold');
    font-size: config('textSizes.lg');
    text-align: center;
  }
  .backup-step-content {
    margin: 0 auto;
    width: 21.875rem;
    height: 19.55rem !important;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    height: 11.25rem;
    padding: 6.25rem 0;
    font-weight: config('fontWeights.semibold');
  }
  .backup-step-word {
    font-size: 1.5625rem;
    margin-right: 1.25rem;
    margin-bottom: 0.4375rem;
  }
  .backup-step-content-item {
    font-weight: config('fontWeights.semibold');
  }
  .backup-step-button {
    box-sizing: border-box;
    margin-top: 1rem;
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
