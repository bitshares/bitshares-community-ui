<template>
  <div class="withdraw-form">
    <div class="withdraw-sub-title">Please scan QR code or enter transfer address manually</div>
    <SimpleInput
      v-model="address"
      :centered="true"
      :error="error"
      title="withdrawal address"
      class="withdraw-input"
      @input="validateUser"
    />
    <div class="withdraw-footer">
      <Button
        :disabled="!validUser"
        text="Confirm address"
        width="full"
        class="withdraw-btn"
        @click="confirmAddress"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
      validUser: false,
      userLoaded: false,
      errorTitle: 'user not found'
    }
  },
  computed: {
    error() {
      if (!this.validUser && this.address && this.userLoaded) {
        return this.errorTitle
      }
      return ''
    }
  },
  created() {
    this.validateUser = debounce(this.getUser, 500)
  },
  methods: {
    ...mapActions({
      setWithdrawStep: 'withdraw/setWithdrawStep',
      setWithdrawAddress: 'withdraw/setWithdrawAddress'
    }),
    async getUser() {
      this.validUser = false
      this.userLoaded = false
      const user = await getUser(this.address)
      this.userLoaded = true
      this.validUser = user.success
    },
    confirmAddress() {
      this.setWithdrawStep('withdrawFinish')
      this.setWithdrawAddress({ address: this.address })
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
