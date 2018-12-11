<template>
  <div class="backup-step h-full sm:w-120">
    <div class="backup-step-title">backup</div>
    <div class="backup-step-subtitle">Please carefully write down this phrase</div>
    <div class="backup-step-content">
      <BackupPhraseItem
        v-for="(word, index) in backupPhrase"
        :key="index"
        :word="word"
      />
    </div>
    <div class="backup-step-footer">
      <div class="backup-step-content-item">We’ll confirm on the next screen</div>
      <div
        class="backup-step-button">
        <Button
          text="i’ve written it down"
          width="full"
          @click="$emit('change', stepConfig['BACKUP_VERIFY'])"
        />
      </div>
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
    backupPhrase: {
      type: Array,
      default() {
        return []
      }
    },
    stepConfig: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .backup-step {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: config('fonts.gotham');
    padding: 0 1.25rem 1.25rem;
    min-height: 30.4375rem;

    .backup-step-title {
      margin-top: 0.9375rem;
      text-transform: uppercase;
      font-family: config('fonts.gotham-medium');
      font-size: config('textSizes.lg');
    }

    .backup-step-subtitle {
      margin: 0.9375rem auto 0;
      font-weight: config('fontWeights.semibold');
      font-size: config('textSizes.lg');
      text-align: center;
    }
    .backup-step-footer {
      display: flex;
      flex-direction: column;
      margin-top: auto;
    }
    .backup-step-content {
      margin-top: auto;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      min-height: 11.25rem;
      padding: 4.25rem 3rem;
      font-weight: config('fontWeights.semibold');

      .backup-step-content-item {
        font-weight: config('fontWeights.semibold');
      }
    }

    .backup-step-button {
      box-sizing: border-box;
      margin-top: 1.12rem;
    }
  }
</style>
