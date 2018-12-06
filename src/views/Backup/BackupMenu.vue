<template>
  <div class="backup-step">
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
    padding: 0 20px;
    width: 100%;
    height: 223px;
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
      width: 20.9375rem;
      font-weight: config('fontWeights.semibold');
      font-size: config('textSizes.lg');
      text-align: center;
    }

    .backup-step-footer {
      bottom: 1.15rem;
    }

    .backup-step-button {
      box-sizing: border-box;
      margin-top: 1rem;
    }

  }
  @media (max-width: 800px) {
    .backup-step {
      .backup-step-button {
        margin: 1.2rem auto 0;
        width: 100%;
      }
    }
  }
</style>
