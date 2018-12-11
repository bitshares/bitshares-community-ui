<template>
  <div class="backup-step">
    <div class="backup-step-title">backup</div>
    <div class="backup-step-button">
      <SInput
        v-model="password"
        :password="true"
        type="number"
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
    width: 100%;
    font-family: config('fonts.gotham');

    .backup-step-title {
      text-align: center;
      margin-top: 0.9375rem;
      text-transform: uppercase;
      font-family: config('fonts.gotham-medium');
      font-size: config('textSizes.lg');
    }

    .backup-step-button {
      width: 100%;
      margin-top: auto;
      padding: 1rem;
      box-sizing: border-box;
    }
  }
  .backup-step-unlock {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
</style>
