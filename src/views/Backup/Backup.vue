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
      :phrase="phrase"
      @change="onChangeStep"
    />
    <BackupVerify
      v-if="currentStep === 4"
      :phrase="randomPhrase"
      :user-phrase="userPhrase"
      :on-select-phrase-from-random-list="onSelectPhraseFromRandomList"
      :on-remove-phrase="onRemovePhrase"
    />
  </div>
</template>
<script>
import BackupStep1 from './BackupStep1'
import BackupStep2 from './BackupStep2'
import BackupPhrase from './BackupPhrase'
import BackupVerify from './BackupVerify'

export default {
  components: {
    BackupStep1,
    BackupStep2,
    BackupPhrase,
    BackupVerify
  },
  data() {
    return {
      currentStep: 1,
      backupPhrase: 'electric animal breakfast chicken kid cat dog js tag world word girl boy car machine',
      randomPhrase: [],
      userPhrase: []
    }
  },
  computed: {
    phrase() {
      return this.backupPhrase.split(' ')
    }
  },
  mounted() {
    this.randomPhrase = this.generatePhrase()
  },
  methods: {
    onChangeStep(step) {
      this.currentStep = step
    },
    onSelectPhraseFromRandomList({ index }) {
      this.userPhrase.push(this.randomPhrase[index])
      this.randomPhrase = this.randomPhrase.filter((item, ndx) => ndx !== index)
    },
    onRemovePhrase({ index }) {
      this.randomPhrase.push(this.userPhrase[index])
      this.userPhrase = this.userPhrase.filter((item, ndx) => ndx !== index)
    },
    generatePhrase() {
      return this.backupPhrase.split(' ').sort(() => {
        return Math.random() - 0.5
      })
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
