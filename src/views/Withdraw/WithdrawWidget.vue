<template>
  <Modal
    v-if="showWithdraw"
    @close="toggle">
    <div class="withdraw-container h-full sm:w-120">
      <div class="withdraw-title">{{ withdrawType }}</div>
      <Withdraw v-if="withdrawStep === 'withdraw'"/>
      <WithdrawConfirmAmount v-if="withdrawStep === 'withdrawConfirmAmount'"/>
      <WithdrawConfirmAddress v-if="withdrawStep === 'withdrawConfirmAddress'"/>
      <WithdrawFinish v-if="withdrawStep === 'withdrawFinish'"/>
    </div>
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
      withdrawStep: 'withdraw/getWithdrawStep',
      withdrawType: 'withdraw/getWithdrawType'
    })
  },
  methods: {
    ...mapActions({
      toggle: 'withdraw/toggleModal',
      setWithdrawStep: 'withdraw/setWithdrawStep'
    })
  }
}
</script>
<style lang="scss">
  .withdraw-container {
    color: config('colors.primary');
    padding: 1rem 0 0;
    display: flex;
    flex-direction: column;

    .withdraw-title {
      font-size: config('textSizes.lg');
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
  }

  @screen sm {
    .withdraw-container {
      height: 30rem;
    }
  }
</style>
