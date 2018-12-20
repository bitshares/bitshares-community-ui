<template>
  <Modal
    v-if="showWithdraw"
    @close="toggle">
    <div class="withdraw-container h-full sm:w-120">
      <div class="withdraw-title">{{ type }}</div>
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
  props: {
    type: {
      type: String,
      default: 'withdraw'
    }
  },
  computed: {
    ...mapGetters({
      showWithdraw: 'withdraw/modalDisplayed',
      withdrawStep: 'withdraw/getWithdrawStep'
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
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;

    .withdraw-title {
      font-size: config('textSizes.lg');
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
  }
  @media screen and (max-width: 800px) {
    .withdraw-container {
      .withdraw-content {
        height: 100%;
      }
    }
  }
</style>
