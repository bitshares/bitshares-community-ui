<template>
  <div class="backup">
    <svgicon
      class="backup-close"
      width="12"
      height="12"
      color="rgba(255,255,255,0.5)"
      name="cancel"
      @click.native="expanded = false"
    />
    <BackupStep1
      v-if="currentStep === 1"
      @change="onChangeStep"
    />
    <BackupStep2
      v-if="currentStep === 2"
      @change="onChangeStep"
    />
    <BackupPhrase
      v-if="currentStep === 3"
      @change="onChangeStep"
    />
  </div>
</template>
<script>
import BackupStep1 from './BackupStep1'
import BackupStep2 from './BackupStep2'
import BackupPhrase from './BackupPhrase'

export default {
  components: {
    BackupStep1,
    BackupStep2,
    BackupPhrase
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
    position: relative;
    color: config('colors.white');
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background: config('colors.bg-base');
    width: 30rem;
    height: 30.4375rem;
    border: 0.0625rem solid config('colors.white')
  }
  .backup-close {
    position: absolute;
    right: 0.625rem;
    top: 0.625rem
  }
</style>
