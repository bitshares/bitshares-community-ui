<template>
  <div class="backup-step backup-step-unlock">
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
    width: 100%;
    padding: 1rem;
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
