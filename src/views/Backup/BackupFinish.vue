<template>
  <div class="backup-step">
    <div class="backup-step-title">almost done! let’s review</div>
    <div class="backup-step-subtitle">Please tap each word in the correct order</div>
    <div class="backup-step-content">
      <div class="backup-step-finish-icon">
        <svgicon
          width="33"
          height="33"
          color="rgba(251,231,9)"
          name="verified"
        />
      </div>
      <div class="backup-step-finish-text">I understand that my funds are held securely on this device, not by a company, and nobody can recover my backup phrase and password</div>
    </div>
    <div class="backup-step-content">
      <div class="backup-step-finish-icon">
        <svgicon
          width="33"
          height="33"
          color="rgba(251,231,9)"
          name="verified"
        />
      </div>
      <div class="backup-step-finish-text">I understand, that if I open BitShares on a new device or clear browser cache, my funds can only be accessed with the backup phrase</div>
    </div>
    <div class="backup-step-content">
      <div class="backup-step-finish-icon">
        <svgicon
          width="33"
          height="33"
          color="rgba(251,231,9)"
          name="verified"
        />
      </div>
      <div class="backup-step-finish-text">I understand, that I need to confirm every transaction with the password</div>
    </div>

    <div class="backup-step-footer">
      <div class="backup-step-button _password">Copy password</div>
      <div class="backup-step-content _footer-content">
        <div class="backup-step-finish-icon">
          <svgicon
            width="33"
            height="33"
            color="rgba(251,231,9)"
            name="verified"
          />
        </div>
        <div class="backup-step-finish-text">
          I have read, understood, and agreed to
          <span class="_terms">theTerms of Use</span>
        </div>
      </div>
      <div class="backup-step-button">Finish backup</div>
    </div>
  </div>
</template>

<script>
import '@icons/verified'

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
    margin: 1.2rem auto 1rem;
    width: 23.875rem;
    font-weight: config('fontWeights.semibold');
    font-size: config('textSizes.lg');
    text-align: center;
  }
  .backup-step-content {
    margin: 0 auto;
    width: 28.625rem;
    margin-bottom: 0.9375rem;
    text-align: left;
    line-height: 1.3;
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
    bottom: 1.1875rem;
  }
  .backup-step-button {
    box-sizing: border-box;
    display: inline-block;
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
  .backup-step-finish-icon {
    width: 2.0625rem;
    display: inline-block;
    margin: 0.3125rem 0.625rem 0.625rem 0.625rem;
  }
  .backup-step-finish-text {
    display: inline-block;
    width: calc(100% - 3.3125rem);
  }
  ._password {
    background-color: transparent;
    color: config('colors.white');
    border: 0.0625rem solid config('colors.white');
    margin-top: .5;
  }
  ._footer-content {
    margin-bottom: .5375rem;
    margin-top: 0.9375rem;
    padding-right: 1.5625rem;

    ._terms {
      color: #FBE709;
      border-bottom: 0.0625rem solid #FBE709;
    }
  }
</style>
