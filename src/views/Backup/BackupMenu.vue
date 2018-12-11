<template>
  <div class="backup-step h-full sm:w-120">
    <div class="backup-step-title">backup</div>
    <div class="backup-step-subtitle">Please choose backup method</div>
    <div class="backup-step-footer">
      <div class="backup-step-button">
        <Button
          text="Save key file"
          type="secondary"
          width="full"
          @click="$emit('change', stepConfig['BACKUP_DOWNLOAD'])"
        />
      </div>
      <div class="backup-step-button">
        <Button
          text="create paper backup"
          type="secondary"
          width="full"
          @click="$emit('change', stepConfig['BACKUP_STEP_1'])"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button/Button'
export default {
  components: {
    Button
  },
  props: {
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
    padding: 0 1.25rem 1.25rem;
    min-height: 13.9375rem;
    text-align: center;
    font-family: config('fonts.gotham');

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

    .backup-step-button {
      margin-top: 1.2rem;
      box-sizing: border-box;
    }
  }
</style>
