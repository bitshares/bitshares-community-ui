<template>
  <Modal
    v-if="showDeposit"
    @close="toggle">
    <Deposit v-if="!isAddressScreen"/>
    <DepositAddress v-if="isAddressScreen"/>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import Deposit from './Deposit.vue'
import DepositAddress from './DepositAddress.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DepositWidget',
  components: {
    Modal,
    Deposit,
    DepositAddress
  },
  computed: {
    ...mapGetters({
      showDeposit: 'deposit/modalDisplayed',
      isAddressScreen: 'deposit/isAddressScreen'
    })
  },
  methods: {
    ...mapActions({
      toggle: 'deposit/toggleModal'
    })
  }
}
</script>
<style >

</style>
