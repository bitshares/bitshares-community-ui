<template>
  <div class="backup">
    <BackupStep1
      v-if="currentStep === 1"
      @change="onChangeStep"
    />
    <BackupStep2
      v-if="currentStep === 2"
      @change="onChangeStep"
    />
  </div>
</template>
<script>
import BackupStep1 from './BackupStep1'
import BackupStep2 from './BackupStep2'

export default {
  components: {
    BackupStep1,
    BackupStep2
  },
  data() {
    return {
      currentStep: 1
    }
  },
  methods: {
    onChangeStep(step) {
      this.currentStep = step
    }
  }
}
</script>
<style lang="scss">
  .backup {
    color: config('colors.white');
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background: config('colors.bg-base');
    width: 30rem;
    height: 30.4375rem;
    border: 0.0625rem solid config('colors.white')
  }
</style>
