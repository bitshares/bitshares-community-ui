<template>
  <Modal
    v-if="showWithdraw"
    @close="toggle">
    <Withdraw/>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import Withdraw from './Withdraw.vue'

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'WithdrawWidget',
  components: {
    Modal,
    Withdraw
  },
  computed: {
    ...mapGetters({
      showWithdraw: 'withdraw/modalDisplayed'
    })
  },
  methods: {
    ...mapActions({
      toggle: 'withdraw/toggleModal'
    })
  }
}
</script>
