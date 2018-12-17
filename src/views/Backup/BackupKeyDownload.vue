          <!-- @click="$emit('change', stepConfig['BACKUP_MENU'], password)" -->
<template>
  <div class="backup-step h-full sm:w-120">
    <div class="backup-step-title">backup</div>
    <SimpleInput
      v-model="password"
      :password="true"
      type="number"
      title="password"/>
    <div class="backup-step-titles-wrapper">
      <div class="backup-step-subtitle--mini">key file</div>
      <div class="backup-step-subtitle">{{ fileName }}</div>
    </div>
    <div class="backup-step-footer">
      <div class="backup-step-button">
        <Button
          text="Download key file"
          width="full"
          @click="$emit('download', { password, fileName })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button/Button'
import SimpleInput from '@/components/SimpleInput'
import { format } from 'date-fns'
export default {
  components: {
    Button,
    SimpleInput
  },
  props: {
    stepConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      password: ''
    }
  },
  computed: {
    fileName() {
      return 'bts_default_' + format(new Date(), 'DD-MM-YYYY') + '.bin'
    }
  }
}
</script>
<style lang="scss" scoped>
  .backup-step {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-between;
    padding: 0 20px 20px;
    min-height: 223px;
    text-align: center;
    font-family: config('fonts.gotham');

    .backup-step-title {
      margin-top: 0.9375rem;
      text-transform: uppercase;
      font-family: config('fonts.gotham-medium');
      font-size: config('textSizes.lg');

      &--mini {
        font-size: config('textSizes.xxs');
        color: rgba(255,255,255,.6);
      }
    }
    .backup-step-subtitle {
      margin: .2 auto 0;
      font-weight: config('fontWeights.bold');
      font-size: config('textSizes.lg');
      text-align: center;
    }
  }
</style>
