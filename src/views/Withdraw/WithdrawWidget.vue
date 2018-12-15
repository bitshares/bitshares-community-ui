<template>
  <Modal
    v-if="showWithdraw"
    @close="toggle">
    <Withdraw v-if="withdrawStep === 'withdraw'"/>
    <WithdrawConfirmAmount v-if="withdrawStep === 'withdrawConfirmAmount'"/>
    <WithdrawConfirmAddress v-if="withdrawStep === 'withdrawConfirmAddress'"/>
    <WithdrawFinish v-if="withdrawStep === 'withdrawFinish'"/>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import Withdraw from './Withdraw.vue'
import WithdrawConfirmAmount from './WithdrawConfirmAmount'
import WithdrawConfirmAddress from './WithdrawConfirmAddress'
import WithdrawFinish from './WithdrawFinish'

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'WithdrawWidget',
  components: {
    Modal,
    Withdraw,
    WithdrawConfirmAmount,
    WithdrawConfirmAddress,
    WithdrawFinish
  },
  computed: {
    ...mapGetters({
      showWithdraw: 'withdraw/modalDisplayed',
      withdrawStep: 'withdraw/getWithdrawStep'
    })
  },
  created() {
    this.setWithdrawStep('withdraw')
  },
  methods: {
    ...mapActions({
      toggle: 'withdraw/toggleModal',
      setWithdrawStep: 'withdraw/setWithdrawStep'
    })
  }
}
</script>
