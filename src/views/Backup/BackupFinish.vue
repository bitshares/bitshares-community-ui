<template>
  <div class="backup-step">
    <div class="backup-step-title">almost done! let’s review</div>
    <div class="backup-step-subtitle">Please tap each word in the correct order</div>
    <div class="backup-step-content">1</div>

    <div class="backup-step-footer">
      <div class="backup-step-content-item">Is this correct?</div>
      <div class="backup-step-button">Finish backup</div>
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
    width: 100%;
    position: relative;
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
    margin: 0.9375rem auto 3rem;
    width: 23.875rem;
    font-weight: config('fontWeights.semibold');
    font-size: config('textSizes.lg');
    text-align: center;
  }
  .backup-step-content {
    margin: 0 auto;
    width: 21.875rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    font-weight: config('fontWeights.semibold');
  }
  .backup-step-content-item {
    font-weight: config('fontWeights.semibold');
  }
  .backup-step-footer {
    position: absolute;
    width: 100%;
    bottom: 20px;
  }
  .backup-step-button {
    box-sizing: border-box;
    display: inline-block;
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
