<template>
  <Modal
    v-if="show"
    @close="$emit('close')"
  >
    <div class="confirm-modal-content">
      <div class="confirm-modal-title">{{ title }}</div>
      <slot/>
      <div v-if="isLocked">
        <SInput
          v-model="password"
          :password="true"
          type="number"
          title="password"
        />
      </div>
      <Button
        text="Confirm"
        width="full"
        @click="confirm"
      />
      <Button
        text="Cancel"
        width="full"
        type="faded"
        @click="$emit('close')"
      />
    </div>
  </Modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SInput from '@/components/SimpleInput'
import Button from '@/components/Button'
import Modal from '@/components/Modal'

export default {
  components: {
    Button, SInput, Modal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      password: ''
    }
  },
  computed: {
    ...mapGetters({
      isLocked: 'acc/isLocked',
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
    },

    confirm() {
      if (this.isLocked) this.unlock()
      if (!this.isLocked) this.$emit('confirm')
    }

  }
}
</script>
<style lang="scss">
  .confirm-modal-title {
    color: config('colors.text-primary');
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: 1.25rem;
  }
  .confirm-modal-content {
    padding: 0.5rem;
  }
</style>
