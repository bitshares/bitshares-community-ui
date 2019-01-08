<template>
  <Modal
    v-if="show"
    @close="closeModal"
  >
    <div class="unlock-account-popup__content sm:w-120">
      <div class="unlock-account-popup__title">unlock account</div>
      <SInput
        :password="true"
        :error="errorMessage"
        v-model="password"
        class="unlock-account-popup__input"
        type="password"
        title="pin or password"
      />
      <Button
        :disabled="confirmDisabled"
        :loading="pending"
        text="Confirm"
        width="full"
        @click="unlock"
      />
      <Button
        text="Cancel"
        width="full"
        type="faded"
        @click="closeModal"
      />
    </div>
  </Modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SInput from '@/components/SimpleInput'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Vue from 'vue'

export default {
  components: {
    Button, SInput, Modal
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    pending: {
      type: Boolean,
      default: false
    },
    onShow: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  data() {
    return {
      password: '',
      show: false,
      error: false,
      resolveCallback: null
    }
  },
  computed: {
    ...mapGetters({
      isLocked: 'acc/isLocked',
      isValidPassword: 'acc/isValidPassword',
      loginType: 'acc/getLoginType',
      username: 'acc/getCurrentUserName'
    }),
    confirmDisabled() {
      return !this.password
    },
    errorMessage() {
      return this.error ? 'Pin or Password is incorrect' : ''
    }
  },
  created() {
    Vue.prototype.$unlock = this.showModal
  },
  methods: {
    ...mapActions({
      unlockWallet: 'acc/unlockWallet',
      cloudLogin: 'acc/cloudLogin'
    }),

    showModal() {
      this.onShow()
      const promise = new Promise(resolve => {
        this.resolveCallback = resolve
      })
      if (!this.isLocked) {
        this.resolveCallback(true)
      } else {
        this.show = true
      }
      return promise
    },

    closeModal() {
      this.resolveCallback(false)
      this.show = false
      this.error = false
      this.password = ''
    },

    async processUnlockCloud() {
      const { error } = await this.cloudLogin({
        name: this.username,
        password: this.password
      })

      if (error) {
        this.error = error
      } else {
        this.resolveCallback(true)
        this.show = false
      }
    },

    processUnlockWallet() {
      this.error = false
      if (this.isValidPassword(this.password + '')) {
        this.unlockWallet(this.password + '')
        this.resolveCallback(true)
        this.show = false
      } else {
        this.error = true
      }
    },

    unlock() {
      if (this.loginType === 'wallet') {
        this.processUnlockWallet()
      } else {
        this.processUnlockCloud()
      }
    }
  }
}
</script>
<style lang="scss">
  .unlock-account-popup__title {
    color: config('colors.text-primary');
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
  }
  .unlock-account-popup__content {
    padding: 1.25rem 1.25rem 0.5rem;
  }
  .unlock-account-popup__input {
    margin: 4rem 0;
  }
</style>
