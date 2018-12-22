<template>
  <div class="withdraw-form">
    <div class="withdraw-item">
      <svgicon
        class="withdraw-item-cancel"
        width="12"
        height="12"
        color="rgba(255,255,255,0.5)"
        name="cancel"
        @click="cancelConfirm"
      />
      <Button
        :text="withdrawAsset.tiker"
        :disabled="true"
        type="secondary"
        width="full"
      />
    </div>
    <div class="withdraw-sub-title">Enter withdrawal amount</div>
    <SimpleInput
      v-model="amount"
      :tip="maxWithdrawTitle"
      :centered="true"
      :error="error"
      :note-clickable="true"
      title="withdrawal amount"
      type="number"
      @note-clicked="amount = withdrawAsset.tokens"
    />
    <div class="withdraw-footer">
      <Button
        :disabled="isAmountInvalid"
        text="Confirm amount"
        width="full"
        class="withdraw-btn"
        @click="confirmAmount"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Button from '@/components/Button'
import SimpleInput from '@/components/SimpleInput'
import '@icons/cancel'

export default {
  components: {
    Button,
    SimpleInput
  },
  data() {
    return {
      amount: ''
    }
  },
  computed: {
    ...mapGetters({
      withdrawAsset: 'withdraw/getWithdrawAsset'
    }),
    maxWithdrawTitle() {
      return `max ${this.withdrawAsset.tokens} ${this.withdrawAsset.tiker}`
    },
    isAmountInvalid() {
      return !!+this.amount <= 0 || +this.amount > this.withdrawAsset.tokens
    },
    error() {
      if (this.amount === undefined || this.amount === '') {
        return ''
      }
      return !this.isAmountInvalid ? '' : `Please enter valid amount less than or equal to ${this.withdrawAsset.tokens}`
    }
  },
  methods: {
    ...mapActions({
      setWithdrawStep: 'withdraw/setWithdrawStep',
      setWithdrawAmount: 'withdraw/setWithdrawAmount'
    }),
    cancelConfirm() {
      this.setWithdrawStep('withdraw')
    },
    confirmAmount() {
      this.setWithdrawStep('withdrawConfirmAddress')
      this.setWithdrawAmount({ amount: this.amount })
    }
  }
}
</script>
<style lang="scss" scoped>
  .withdraw-form {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem;
  }
  .withdraw-sub-title {
    letter-spacing: -0.0555rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  .withdraw-item {
    margin-top: 1rem;
    position: relative;
    .withdraw-item-cancel {
      position: absolute;
      right: 1rem;
      top: 1.2rem;
      z-index: 100;
      cursor: pointer;
    }
  }
  .withdraw-footer {
    margin-top: auto;
    display: flex;
    padding-top: 1rem;
  }
</style>
