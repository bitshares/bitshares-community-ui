<template>
  <div class="backup-step">
    <div class="backup-step-title">almost done! let’s review</div>
    <div
      v-for="(text, index) in paragraphs"
      :key="index"
      class="backup-step-content"
    >
      <div class="backup-step-finish-icon">
        <svgicon
          width="33"
          height="33"
          color="rgba(251,231,9)"
          name="verified"
        />
      </div>
      <div class="backup-step-finish-text">{{ text }}</div>
    </div>
    <div class="backup-step-footer">
      <!-- <div
        class="backup-step-button _password">
        <Button
          type="secondary"
          text="Copy password"
          width="full"
          @click="copyUserPhrase"
        />
      </div> -->
      <div class="backup-step-content _footer-content">
        <div class="backup-step-finish-icon">
          <svgicon
            width="33"
            height="33"
            color="rgba(251,231,9)"
            name="verified"
          />
        </div>
        <div class="backup-step-finish-text">
          I have read, understood, and agreed to the
          <span class="_terms">Terms of Use</span>
        </div>
      </div>
      <div class="backup-step-button">
        <Button
          text="Finish backup"
          width="full"
          @click="updateBackupFlag"
        />
      </div>
    </div>
  </div>
</template>

<script>
import '@icons/verified'
import Button from '@/components/Button/Button'
import { mapActions } from 'vuex'

export default {
  components: {
    Button
  },
  props: {
    backupPhrase: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      paragraphs: [
        'I understand that my funds are held securely on this device, not by a company, and nobody can recover my backup phrase and password',
        'I understand, that if I open BitShares on a new device or clear browser cache, my funds can only be accessed with the backup phrase',
        'I understand, that I need to confirm every transaction with the password'
      ]
    }
  },
  methods: {
    ...mapActions({
      toggleModal: 'backup/toggleModal',
      storeBackupDate: 'acc/storeBackupDate'
    }),

    updateBackupFlag() {
      this.$nextTick(() => {
        this.toggleModal(false)
        this.storeBackupDate()
      })
    },
    copyUserPhrase() {
      window.navigator.clipboard.writeText(this.backupPhrase)
    }
  }
}
</script>
<style lang="scss" scoped>
  .backup-step {
    width: 100%;
    position: relative;
    text-align: center;
    font-family: config('fonts.gotham');

    .backup-step-title {
      margin-top: 0.9375rem;
      margin-bottom: 2.5rem;
      text-transform: uppercase;
      font-family: config('fonts.gotham-medium');
      font-size: config('textSizes.lg');
    }

    .backup-step-content {
      margin: 0 auto;
      width: 28.625rem;
      margin-bottom: 0.9375rem;
      text-align: left;
      line-height: 1.3;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      font-weight: config('fontWeights.semibold');

      .backup-step-content-item {
        font-weight: config('fontWeights.semibold');
      }
    }

    .backup-step-footer {
      position: absolute;
      width: 100%;
      bottom: 1.0975rem;
    }

    .backup-step-button {
      box-sizing: border-box;
      display: inline-block;
      width: 27.5rem;
    }

    .backup-step-finish-icon {
      width: 2.0625rem;
      display: inline-block;
      margin: 0.3125rem 0.625rem 0.625rem 0.625rem;
    }

    .backup-step-finish-text {
      display: inline-block;
      width: calc(100% - 3.3125rem);
    }

    ._password {
      background-color: transparent;
      color: config('colors.white');
      border: 0.0625rem solid config('colors.white');
      margin-top: .5;
    }

    ._footer-content {
      margin-bottom: .5375rem;
      margin-top: 0.9375rem;
      padding-right: 1.5625rem;

      ._terms {
        color: #FBE709;
        border-bottom: 0.0625rem solid #FBE709;
      }
    }
  }
  @media (max-width: 800px) {
    .backup-step {
      width: 90%;
      .backup-step-subtitle {
        font-size: 0.8125rem;
        margin-left: auto;
        margin-right: auto;
      }
      .backup-step-content {
        width: 100%;
        font-size: config('textSizes.sm');
      }
      .backup-step-button {
        width: 100%;
      }
      .backup-step-footer {
        bottom: .1rem;
      }
    }
  }

</style>
