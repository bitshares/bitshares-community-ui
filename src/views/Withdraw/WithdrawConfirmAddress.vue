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
        :disabled="!formValid"
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
      validAddress: false,
      userLoaded: false,
      errorTitle: 'user not found'
    }
  },
  computed: {
    ...mapGetters({
      withdrawType: 'withdraw/getWithdrawType',
      withdrawAsset: 'withdraw/getWithdrawAsset',
      coinsData: 'openledger/getCoinsData'
    }),
    error() {
      if (!this.validUser && this.address && this.userLoaded) {
        return this.errorTitle
      }
      if (!this.validAddress && this.address) {
        return 'Address is not valid'
      }
      return ''
    },
    inputTitle() {
      return `${this.withdrawType} address`
    },
    formValid() {
      return (this.withdrawType === 'withdraw') ? this.validAddress : this.validUser
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
      saveWithdrawMemo: 'withdraw/setWithdrawMemo',
      checkAddress: 'openledger/checkIfAddressIsValid'
    }),
    async getUser() {
      this.validUser = false
      this.userLoaded = false
      const user = await getUser(this.address)
      this.userLoaded = true
      this.validUser = user.success
    },
    async checkAddressIsValid() {
      const formatedAsset = this.withdrawAsset.tiker.toLowerCase().replace('open.', '')
      const isValidAdress = await this.checkAddress({
        address: this.address,
        asset: formatedAsset
      })
      this.validAddress = isValidAdress
    },
    async confirmAddress() {
      const unlocked = await this.$unlock()
      if (unlocked) {
        this.setWithdrawStep('withdrawFinish')
        this.setWithdrawAddress({ address: this.address })
      }
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
    padding: 1rem;
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
