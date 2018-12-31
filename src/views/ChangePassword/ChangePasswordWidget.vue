<template>
  <Modal
    v-if="showModal"
    @close="toggle">
    <div class="change-password-container sm:w-120">
      <div class="change-password-title">Change password</div>
      <ChangePassword v-if="passwordStep === 'change'"/>
      <ChangePasswordFinish v-if="passwordStep === 'finish'"/>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import ChangePassword from '@/views/ChangePassword/ChangePassword'
import ChangePasswordFinish from '@/views/ChangePassword/ChangePasswordFinish'

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ChangePasswordWidget',
  components: {
    Modal,
    ChangePassword,
    ChangePasswordFinish
  },
  computed: {
    ...mapGetters({
      showModal: 'changePassword/modalDisplayed',
      passwordStep: 'changePassword/getPasswordStep'
    })
  },
  methods: {
    ...mapActions({
      toggle: 'changePassword/toggleModal'
    })
  }
}
</script>
<style lang="scss">
  .change-password-container {
    color: config('colors.primary');
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;

    .change-password-title {
      font-size: config('textSizes.lg');
      font-weight: 600;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    .change-password-sub-title {
      font-size: config('textSizes.lg');
      text-align: center;
    }
  }
</style>
