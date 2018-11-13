<template>
  <div class="backup-step">
    <div class="backup-step-title">backup</div>
    <div class="backup-step-subtitle">Please carefully write down this phrase</div>
    <div class="backup-step-content">
      <BackupPhraseItem
        v-for="(word, index) in phrase"
        :key="index"
        :word="word"
      />
    </div>
    <div class="backup-step-content-item">We’ll confirm on the next screen</div>
    <div
      class="backup-step-button"
      @click="$emit('change', 4)"
    >
      <Button
        text="i’ve written it down"
        width="full"
      />
    </div>
  </div>
</template>

<script>
import BackupPhraseItem from './BackupPhraseItem'
import Button from '@/components/Button/Button'

export default {
  components: {
    BackupPhraseItem,
    Button
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
    padding: 4.25rem 0;
    font-weight: config('fontWeights.semibold');
  }
  .backup-step-content-item {
    font-weight: config('fontWeights.semibold');
  }
  .backup-step-button {
    box-sizing: border-box;
    margin-top: 1.12rem;
    width: 27.5rem;
  }
</style>
