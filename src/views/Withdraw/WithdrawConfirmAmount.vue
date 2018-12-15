<template>
  <div class="withdraw-container h-full sm:w-120">
    <div class="withdraw-title">Withdraw</div>
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
      :error="isAmountValid === 'valid' ? '' : isAmountValid"
      title="withdrawal amount"
    />
    <div class="withdraw-footer">
      <Button
        :disabled="(isAmountValid === errorTitle || !isAmountValid) ? true : false"
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
      amount: '',
      errorTitle: 'Please enter valid amount'
    }
  },
  computed: {
    ...mapGetters({
      withdrawAsset: 'withdraw/getWithdrawAsset'
    }),
    maxWithdrawTitle() {
      return `max ${this.withdrawAsset.tokens} ${this.withdrawAsset.tiker}`
    },
    isAmountValid() {
      const isNumeric = () => !isNaN(parseFloat(this.amount)) && isFinite(this.amount)

      if (!this.amount) {
        return ''
      }
      if (!isNumeric() || +this.amount < 1 || +this.amount > this.withdrawAsset.tokens) {
        return this.errorTitle
      }
      return 'valid'
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
  .withdraw-container {
    color: config('colors.primary');
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    min-height: 19.375rem;
    .loading {
      overflow: initial;
    }
    .withdraw-title {
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
      font-size: config('textSizes.lg');
    }
    .withdraw-sub-title {
      letter-spacing: -0.0555rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      text-align: center;
    }
    .withdraw-item {
      margin-top: 0;
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
    }
  }
</style>
