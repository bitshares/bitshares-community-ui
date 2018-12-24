<template>
  <div
    v-if="type === 'withdraw' && !olWorks"
    class="withdraw-form">
    <div class="withdraw-sub-title">Sorry, Openledger is down</div>
    <div class="withdraw-footer">
      <Button
        text="I will try later"
        width="full"
        class="withdraw-btn"
        @click="toggle"
      />
    </div>
  </div>
  <div
    v-else
    class="withdraw-form">
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
    <div class="withdraw-comissions">
      <div class="item">
        <div class="description">
          Transaction fee
        </div>
        <div class="value">
          {{ transactionFee }} BTS
        </div>
      </div>
      <div
        v-if="type === 'withdraw'"
        class="item">
        <div class="description">
          Gateway fee
        </div>
        <div class="value">
          {{ openledgerFee }} {{ withdrawAsset.tiker }}
        </div>
      </div>
    </div>
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
      withdrawAsset: 'withdraw/getWithdrawAsset',
      type: 'withdraw/getWithdrawType',
      olWorks: 'withdraw/openledgerWorks',
      openledgerFee: 'withdraw/openledgerFee',
      transactionFee: 'withdraw/transactionFee'
    }),
    maxWithdrawTitle() {
      return `max ${this.withdrawAsset.tokens} ${this.withdrawAsset.tiker}`
    },
    isAmountInvalid() {
      if (this.type === 'withdraw') {
        const minToWithdraw = +this.openledgerFee * 2
        if (+this.amount < minToWithdraw) {
          return true
        }
      }
      return !!+this.amount <= 0 || +this.amount > this.withdrawAsset.tokens
    },
    error() {
      if (this.amount === undefined || this.amount === '') {
        return ''
      }
      if (this.type === 'withdraw') {
        const minToWithdraw = +this.openledgerFee * 2
        if (+this.amount < minToWithdraw) {
          return `Min amount to withdraw ${minToWithdraw}`
        }
      }
      return !this.isAmountInvalid ? '' : `Please enter valid amount less than or equal to ${this.withdrawAsset.tokens}`
    }
  },
  methods: {
    ...mapActions({
      setWithdrawStep: 'withdraw/setWithdrawStep',
      setWithdrawAmount: 'withdraw/setWithdrawAmount',
      toggle: 'withdraw/toggleModal'
    }),
    cancelConfirm() {
      this.setWithdrawStep('withdraw')
    },
    confirmAmount() {
      this.setWithdrawAmount({ amount: this.amount })
      this.setWithdrawStep('withdrawConfirmAddress')
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

  .withdraw-comissions {
    display: flex;
    margin-top: 3rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: config('textSizes.4xl');

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      .description {
        margin: .1rem;
        font-size: config('textSizes.xxs-xs');
        color: config('colors.inactive');
      }

      .value {
        margin: .1rem;
        color: config('colors.primary');
        font-size: config('textSizes.xs');
      }
    }
  }
</style>
