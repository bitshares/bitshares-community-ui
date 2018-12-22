<template>
  <Modal
    v-if="show"
    :class="{
      'modal-border-buy': type === 'buy',
      'modal-border-sell': type === 'sell',
    }"
    @close="$emit('close')"
  >
    <div
      class="confirm-modal-content"
    >
      <div class="confirm-modal-title">{{ title }}</div>
      <slot/>
      <Button
        :loading="pending"
        class="confirm-btn"
        text="Confirm"
        width="full"
        @click="$emit('confirm')"
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
    },
    pending: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'buy'
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
    padding: 0 1.3125rem;
    max-width: 30rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    .confirm-btn {
      margin-top: auto;
    }
  }

  .modal-border-buy .modal-wrapper {
    border-top: 0.25rem solid config('colors.buy');
  }

  .modal-border-sell .modal-wrapper {
    border-top: 0.25rem solid config('colors.sell');
  }
</style>
