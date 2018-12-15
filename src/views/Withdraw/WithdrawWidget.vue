<template>
  <Modal
    v-if="showWithdraw"
    @close="toggle">
    <Withdraw v-if="withdrawStep === 'withdraw'"/>
    <WithdrawConfirm v-if="withdrawStep === 'withdrawConfirm'"/>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import Withdraw from './Withdraw.vue'
import WithdrawConfirm from './WithdrawConfirm.vue'

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'WithdrawWidget',
  components: {
    Modal,
    Withdraw,
    WithdrawConfirm
  },
  computed: {
    ...mapGetters({
      showWithdraw: 'withdraw/modalDisplayed',
      withdrawStep: 'withdraw/getWithdrawStep'
    })
  },
  methods: {
    ...mapActions({
      toggle: 'withdraw/toggleModal'
    })
  }
}
</script>
