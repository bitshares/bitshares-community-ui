<template>
  <div class="backup-step h-full sm:w-120">
    <div class="backup-step-title">backup</div>
    <div class="backup-step-button">
      <SInput
        v-model="password"
        :password="true"
        type="password"
        title="PASSWORD"
      />
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
import SInput from '@/components/SimpleInput'

export default {
  components: {
    Button, SInput
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
      if (this.isValidPassword(this.password + '')) {
        this.unlockWallet(this.password + '')
      } else {
        this.$toast.error('Invalid password')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .backup-step {
    display: flex;
    flex-direction: column;
    padding: 0 1.25rem 1.25rem;
    font-family: config('fonts.gotham');

    .backup-step-title {
      text-align: center;
      margin-top: 0.9375rem;
      text-transform: uppercase;
      font-family: config('fonts.gotham-medium');
      font-size: config('textSizes.lg');
    }

    .backup-step-button {
      display: flex;
      flex-direction: column;
      margin-top: auto;
    }
  }
</style>
