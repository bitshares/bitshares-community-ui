<template>
  <div class="password-container">
    <div class="password-title">First, confirm your current password and then create a new one</div>
    <div class="password-wrapper">
      <SimpleInput
        v-model="oldPassword"
        :centered="isCentered"
        title="Enter old password"
        class="password"
      />
      <SimpleInput
        v-model="newPassword"
        :centered="isCentered"
        title="Create new password"
        tip="Min. 8 characters with different case including digits 0-9"
        class="password"
      />
      <SimpleInput
        v-model="confirmPassword"
        :centered="isCentered"
        :error="matchPasswordsError"
        title="Reenter new password"
        class="password"
      />
    </div>
    <div class="password-btn-wrapper">
      <Button
        :disabled="!validOldPassword || !validNewPassword || !!matchPasswordsError"
        text="Next"
        width="full"
        class="password-btn-item"
      />
      <Button
        text="Cancel"
        width="full"
        class="password-btn-item"
        @click="toggle"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import SimpleInput from '@/components/SimpleInput'
import Button from '@/components/Button'

export default {
  components: {
    SimpleInput,
    Button
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      isCentered: false
    }
  },
  computed: {
    validOldPassword() {
      return true
    },
    validNewPassword() {
      return true
    },
    matchPasswordsError() {
      if (this.validOldPassword && this.newPassword) {
        return this.newPassword === this.confirmPassword ? '' : 'Passwords don’t match'
      } else {
        return ''
      }
    }
  },
  created() {
    this.isCentered = document.querySelector('body').clientWidth < 800
  },
  methods: {
    ...mapActions({
      toggle: 'changePassword/toggleModal'
    })
  }
}
</script>
<style lang="scss">
  .password-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .password {
      margin-top: .5rem;
    }
  }
  .password-title {
    font-size: config('textSizes.lg');
    text-align: center;
  }
  .password-wrapper {
    display: flex;
    margin-top: auto;
    flex-direction: column;
  }
  .password-btn-wrapper {
    display: flex;
    margin-top: auto;
    flex-direction: column;

    .password-btn-item {
      margin-top: .5rem;
    }
  }
</style>
