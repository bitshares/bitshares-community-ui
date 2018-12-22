<template>
  <div class="withdraw-form">
    <div class="withdraw-sub-title">Please scan QR code or enter transfer address manually</div>
    <SimpleInput
      v-model="address"
      :centered="true"
      :error="error"
      :title="inputTitle"
      class="withdraw-input"
      @input="validate"
    />
    <SimpleInput
      v-if="withdrawType === 'transfer'"
      v-model="memo"
      :centered="true"
      title="MEMO"
      class="withdraw-input"
      @input="saveMemo"
    />
    <div class="withdraw-footer">
      <Button
        :disabled="!validUser || transferAddressValid"
        text="Confirm address"
        width="full"
        class="withdraw-btn"
        @click="confirmAddress"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import Button from '@/components/Button'
import SimpleInput from '@/components/SimpleInput'
import { getUser } from 'vuex-bitshares/src/services/api/account.js'

export default {
  components: {
    Button,
    SimpleInput
  },
  data() {
    return {
      address: '',
      memo: '',
      validUser: false,
      userLoaded: false,
      errorTitle: 'user not found'
    }
  },
  computed: {
    ...mapGetters({
      withdrawType: 'withdraw/getWithdrawType',
      withdrawAsset: 'withdraw/getWithdrawAsset',
      transferAddressValid: 'openledger/getTransferAddressValid'
    }),
    error() {
      if (!this.validUser && this.address && this.userLoaded) {
        return this.errorTitle
      }
      return ''
    },
    inputTitle() {
      return `${this.withdrawType} address`
    }
  },
  created() {
    if (this.withdrawType === 'withdraw') {
      this.validate = debounce(this.checkAddressIsValid, 500)
    } else {
      this.validate = debounce(this.getUser, 500)
    }
  },
  methods: {
    ...mapActions({
      setWithdrawStep: 'withdraw/setWithdrawStep',
      setWithdrawAddress: 'withdraw/setWithdrawAddress',
      checkIfAddressIsValid: 'openledger/checkIfAddressIsValid',
      saveWithdrawMemo: 'withdraw/setWithdrawMemo'
    }),
    async getUser() {
      this.validUser = false
      this.userLoaded = false
      const user = await getUser(this.address)
      this.userLoaded = true
      this.validUser = user.success
    },
    checkAddressIsValid() {
      this.checkIfAddressIsValid({ address: this.address, asset: this.withdrawAsset.tiker })
    },
    confirmAddress() {
      this.setWithdrawStep('withdrawFinish')
      this.setWithdrawAddress({ address: this.address })
    },
    saveMemo() {
      this.saveWithdrawMemo(this.memo)
    }
  }
}
</script>
<style lang="scss" scoped>
  .withdraw-form {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .withdraw-sub-title {
    font-size: config('textSizes.lg');
    text-align: center;
  }
  .withdraw-input {
    margin-top: auto;
    margin-bottom: 1rem;
    display: flex;
  }
  .withdraw-footer {
    margin-top: auto;
    display: flex;
  }
</style>
