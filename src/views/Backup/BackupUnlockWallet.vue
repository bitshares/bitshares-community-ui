<template>
  <div class="backup-step backup-step-unlock">
    <div class="backup-step-button">
      <input
        v-model="password"
        class="input"
        type="password"
        placeholder="Password"
      >
      <Button
        text="Unlock wallet"
        width="full"
        @click="unlock"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Button from '@/components/Button'

export default {
  components: {
    Button
  },
  data() {
    return {
      password: ''
    }
  },
  computed: {
    ...mapGetters({
      isValidPassword: 'acc/isValidPassword'
    })
  },
  methods: {
    ...mapActions('acc', ['unlockWallet']),

    unlock() {
      if (this.isValidPassword(this.password)) {
        this.unlockWallet(this.password)
      } else {
        this.$toast.error('Invalid password')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .backup-step {
    .input {
      @apply text-2xl;
      @apply pt-1 px-0 pb-0;
      color: config('colors.text-primary');
      width: 100%;
      margin-bottom: 1rem;
      border-radius: 0;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid config('colors.input-border');
      box-shadow: none !important;
      text-overflow: ellipsis;
      font-size: config('textSizes.lg');
      transition: border-color ease-in-out 0.15s;
      &:disabled {
        opacity: 0.3;
        user-select: none;
        pointer-events: none;
      }
      &:focus {
        outline: 0 !important;
        border-color: config('colors.text-primary');
      }
    }
    width: 100%;
    padding: 1rem;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // text-align: center;
    font-family: config('fonts.gotham');

    .backup-step-button {
      box-sizing: border-box;
      display: inline-block;
    }
  }
  .backup-step-unlock {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  @media (max-width: 800px) {
    .backup-step {
      .backup-step-button {
        width: 80%;
      }
    }
  }
</style>
