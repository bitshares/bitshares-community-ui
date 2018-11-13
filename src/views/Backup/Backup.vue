<template>
  <div class="backup">
    <svgicon
      v-if="currentStep > 1 && currentStep < 5"
      class="backup-paginator"
      name="arrowDown"
      @click="goBack"
    />
    <div
      class="backup-close"
      @click="updateBackupFlag"
    >
      <svgicon
        width="12"
        height="12"
        color="rgba(255,255,255,0.5)"
        name="cancel"
      />
    </div>
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
      @clear="onClear"
      @change="onChangeStep"
    />
    <BackupFinish v-if="currentStep === 5"/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import BackupStep1 from './BackupStep1'
import BackupStep2 from './BackupStep2'
import BackupPhrase from './BackupPhrase'
import BackupVerify from './BackupVerify'
import BackupFinish from './BackupFinish'

export default {
  components: {
    BackupStep1,
    BackupStep2,
    BackupPhrase,
    BackupVerify,
    BackupFinish
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
    ...mapActions('backup', ['setBackupFlag']),

    updateBackupFlag() {
      this.$nextTick(() => {
        this.setBackupFlag(false)
      })
    },
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
    },
    goBack() {
      this.currentStep--
    },
    onClear() {
      this.randomPhrase = this.randomPhrase.concat(this.userPhrase)
      this.userPhrase = []
    }
  }
}
</script>
<style lang="scss">
  .backup {
    cursor: default;
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
    top: 0.625rem;
    z-index: 11;
    cursor: pointer;
  }
  .backup-paginator {
    position: absolute;
    left: 15px;
    top: 15px;
    transform: rotate(90deg);
    z-index: 10;
    cursor: pointer;
  }
</style>
