<template>
  <div class="backup-step">
    <div class="backup-step-title">Verify backup</div>
    <div class="backup-step-subtitle">Please tap each word in the correct order</div>
    <div class="backup-step-content">
      <BackupPhraseItem
        v-for="(word, index) in userPhrase"
        :key="index"
        :index="index"
        :word="word"
        :border="true"
        :is-cursor="true"
        @click.native="removeWord({ index })"
      />
    </div>
    <div class="backup-step-content-item _verify">Let’s verify your backup phrase</div>
    <div class="backup-step-content">
      <BackupPhraseItem
        v-for="(word, index) in randomPhrase"
        :key="index"
        :index="index"
        :word="word"
        :is-cursor="true"
        @click.native="selectWord({ index })"
      />
    </div>
    <div class="backup-step-footer">
      <div class="backup-step-content-item">Is this correct?</div>
      <div class="backup-step-button _clear">
        <Button
          text="Clear"
          width="full"
          @click="onClear"
        />
      </div>
      <div class="backup-step-button _confirm">
        <Button
          :disabled="isIncorrectKey"
          text="Confirm"
          width="full"
          @click="!isIncorrectKey && $emit('change', 5)"
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
    }
  },
  data() {
    return {
      userPhrase: [],
      randomPhrase: []
    }
  },
  computed: {
    isIncorrectKey() {
      console.info(this.backupPhrase, this.userPhrase)
      return this.backupPhrase.join(' ') !== this.userPhrase.join(' ')
    }
  },
  mounted() {
    this.randomPhrase = this.generateRandomPhrase()
  },
  methods: {
    generateRandomPhrase() {
      return this.backupPhrase.slice(0).sort(() => {
        return Math.random() - 0.5
      })
    },
    selectWord({ index }) {
      this.userPhrase.push(this.randomPhrase[index])
      this.randomPhrase = this.randomPhrase.filter((item, ndx) => ndx !== index)
    },
    removeWord({ index }) {
      this.randomPhrase.push(this.userPhrase[index])
      this.userPhrase = this.userPhrase.filter((item, ndx) => ndx !== index)
    },
    onClear() {
      this.randomPhrase = this.generateRandomPhrase()
      this.userPhrase = []
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
      text-transform: uppercase;
      font-family: config('fonts.gotham-medium');
      font-size: config('textSizes.lg');
    }

    .backup-step-subtitle {
      margin: 0.9375rem auto 3rem;
      width: 23.875rem;
      font-weight: config('fontWeights.semibold');
      font-size: config('textSizes.lg');
      text-align: center;
    }

    .backup-step-content {
      margin: 0 auto;
      width: 21.875rem;
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
      bottom: 1.15rem;
    }

    .backup-step-button {
      box-sizing: border-box;
      display: inline-block;
      margin-top: 1rem;
      width: 13rem;

      &._clear {
        margin-right: 0.3rem;
      }
      &._confirm {
        margin-left: 1rem;
      }
    }

    ._verify {
      margin: .5rem auto;
    }
  }
  @media (max-width: 800px) {
    .backup-step {
      .backup-step-button {
        width: 40%;
      }
      .backup-step-subtitle {
        width: 90%;
      }
    }
  }
</style>
