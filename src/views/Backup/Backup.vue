      <!-- @change="onSave" -->
<template>
  <div class="backup-container h-full sm:w-120">
    <svgicon
      v-if="currentStep > 0"
      class="backup-paginator"
      name="arrowDown"
      @click="goBack"
    />
    <BackupMenu
      v-if="currentStep === stepConfig['BACKUP_MENU']"
      :step-config="stepConfig"
      @change="onChangeStep"
    />
    <BackupStep1
      v-if="currentStep === stepConfig['BACKUP_STEP_1']"
      :step-config="stepConfig"
      @change="onChangeStep"
    />
    <BackupStep2
      v-if="currentStep === stepConfig['BACKUP_STEP_2']"
      :step-config="stepConfig"
      @change="onChangeStep"
    />
    <BackupUnlockWallet v-if="currentStep === stepConfig['BACKUP_PHRASE'] && isLocked"/>
    <BackupPhrase
      v-if="currentStep === stepConfig['BACKUP_PHRASE'] && !isLocked"
      :backup-phrase="phrase"
      :step-config="stepConfig"
      @change="onChangeStep"
    />
    <BackupVerify
      v-if="currentStep === stepConfig['BACKUP_VERIFY']"
      :backup-phrase="phrase"
      :step-config="stepConfig"
      @change="onChangeStep"
    />
    <BackupFinish
      v-if="currentStep === stepConfig['BACKUP_FINISH']"
      :backup-phrase="backupPhrase"
    />
    <BackupKeyDownload
      v-if="currentStep === stepConfig['BACKUP_DOWNLOAD']"
      :step-config="stepConfig"
      @download="onSave"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import BackupMenu from './BackupMenu'
import BackupKeyDownload from './BackupKeyDownload'
import BackupStep1 from './BackupStep1'
import BackupStep2 from './BackupStep2'
import BackupPhrase from './BackupPhrase'
import BackupVerify from './BackupVerify'
import BackupFinish from './BackupFinish'
import BackupUnlockWallet from './BackupUnlockWallet'

export default {
  components: {
    BackupMenu,
    BackupKeyDownload,
    BackupStep1,
    BackupStep2,
    BackupPhrase,
    BackupVerify,
    BackupFinish,
    BackupUnlockWallet
  },
  data() {
    return {
      currentStep: 0,
      stepConfig: {
        'BACKUP_MENU': 0,
        'BACKUP_STEP_1': 1,
        'BACKUP_STEP_2': 2,
        'BACKUP_PHRASE': 3,
        'BACKUP_VERIFY': 4,
        'BACKUP_FINISH': 5,
        'BACKUP_DOWNLOAD': 6
      }
    }
  },
  computed: {
    ...mapGetters({
      backupPhrase: 'acc/getBrainkey',
      isLocked: 'acc/isLocked',
      userName: 'acc/getCurrentUserName',
      isValidPassword: 'acc/isValidPassword'
    }),
    phrase() {
      return this.backupPhrase.split(' ')
    }
  },
  methods: {
    ...mapActions('backup', ['toggleModal']),
    ...mapActions({
      backupBlob: 'acc/getBackupBlob',
      unlockWallet: 'acc/unlockWallet'
    }),

    closeModal() {
      this.$nextTick(() => {
        this.toggleModal(false)
      })
    },
    onChangeStep(step) {
      this.currentStep = step
    },
    saveAs(data, fileName) {
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      const blob = new Blob(data, { type: 'application/octet-stream; charset=us-ascii' })
      const url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = fileName
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    },

    async onSave(password) {
      const passwordString = password.toString()

      if (!this.isValidPassword(passwordString)) {
        return
      }
      if (this.isLocked) {
        this.unlockWallet(passwordString)
      }
      const blob = await this.backupBlob({
        brainkey: this.backupPhrase,
        password: passwordString,
        name: this.userName
      })

      this.saveAs([new Uint8Array(blob)], 'bts_default121_20102.bin')
    },
    goBack() {
      if (this.currentStep === this.stepConfig['BACKUP_DOWNLOAD']) {
        this.currentStep = 0
        return
      }
      this.currentStep--
    }
  }
}
</script>
<style lang="scss">
  .backup-container {
    cursor: default;
    position: relative;
    color: config('colors.white');
    background: config('colors.card-background');

    .backup-paginator {
      position: absolute;
      left: 15px;
      top: 15px;
      transform: rotate(90deg);
      z-index: 10;
      cursor: pointer;
    }
  }
</style>
