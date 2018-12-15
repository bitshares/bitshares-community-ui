<template>
  <Modal
    v-if="show"
    @close="closeModal"
  >
    <div class="unlock-account-popup-content">
      <div class="unlock-account-popup-title">unlock account</div>
      <SInput
        :password="true"
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
        @click="confirm"
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
    }
  },
  data() {
    return {
      password: '',
      show: false
    }
  },
  computed: {
    ...mapGetters({
      isLocked: 'acc/isLocked',
      isValidPassword: 'acc/isValidPassword'
    }),

    confirmDisabled() {
      return this.isLocked && !this.password
    }
  },
  created() {
    Vue.prototype.$unlock = this.showModal
  },
  methods: {
    ...mapActions('acc', ['unlockWallet']),

    showModal() {
      this.show = true
      const promise = new Promise((resolve, reject) => {

      })
      return promise
    },

    closeModal() {
      this.show = false
    },

    unlock() {
      if (this.isValidPassword(this.password + '')) {
        this.unlockWallet(this.password + '')
      } else {
        this.$toast.error('Invalid password')
      }
    },

    confirm() {
      if (this.isLocked) this.unlock()
      if (!this.isLocked) this.$emit('confirm')
    }

  }
}
</script>
<style lang="scss">
  .unlock-account-popup__input {
    margin: 4rem 0;
  }
  .unlock-account-popup-title {
    color: config('colors.text-primary');
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
  }
  .unlock-account-popup-content {
    padding: 1.25rem 1.25rem 0.5rem;
  }
</style>
