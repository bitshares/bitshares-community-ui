<template>
  <div class="backup-step">
    <div class="backup-step-title">Verify backup</div>
    <div class="backup-step-subtitle">Please tap each word in the correct order</div>
    <div class="backup-step-content-item">Let’s verify your backup phrase</div>
    <div class="backup-step-content">
      <BackupPhraseItem
        v-for="(word, index) in phrase"
        :key="index"
        :word="word"
        :border="true"
      />
    </div>
    <div class="backup-step-content-item">Is this correct?</div>
    <div class="backup-step-button _clear">Clear</div>
    <div class="backup-step-button _confirm">Confirm</div>
  </div>
</template>

<script>
import BackupPhraseItem from './BackupPhraseItem'

export default {
  components: {
    BackupPhraseItem
  },
  props: {
    phrase: {
      type: Array,
      default() {
        return []
      }
    }
  },
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
    width: 23.875rem;
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
    height: 5.25rem;
    padding: 4.25rem 0;
    font-weight: config('fontWeights.semibold');
  }
  .backup-step-content-item {
    font-weight: config('fontWeights.semibold');
  }
  .backup-step-button {
    box-sizing: border-box;
    display: inline-block;
    margin-top: 1rem;
    width: 13rem;
    height: 3rem;
    line-height: 3rem;
    background-color: config('colors.white');
    text-align: center;
    color: config('colors.button-text');
    font-family: config('fonts.gotham-medium');
    text-transform: uppercase;
    cursor: pointer;

    &._clear {
      margin-right: 0.3rem;
    }
    &._confirm {
      margin-left: 1rem;
    }
  }
</style>
