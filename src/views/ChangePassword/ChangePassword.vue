<template>
  <div class="password-container">
    <div class="password-title">First, confirm your current password and then create a new one</div>
    <div class="password-wrapper">
      <SimpleInput
        v-model="oldPassword"
        :centered="isCentered"
        type="password"
        title="Enter old password"
        class="password"
      />
      <SimpleInput
        v-model="newPassword"
        :centered="isCentered"
        type="password"
        title="Create new password"
        tip="Min. 8 characters with different case including digits 0-9"
        class="password"
      />
      <SimpleInput
        v-model="confirmPassword"
        :centered="isCentered"
        :error="matchPasswordsError"
        type="password"
        title="Reenter new password"
        class="password"
      />
    </div>
    <div class="password-btn-wrapper">
      <Button
        :disabled="!validOldPassword || !validNewPassword || !!matchPasswordsStr"
        text="Next"
        width="full"
        class="password-btn-item"
        @click="setPasswordStep('finish')"
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
import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters({
      isValidPassword: 'acc/isValidPassword'
    }),
    validOldPassword() {
      return this.oldPassword.length >= 8 ? this.isValidPassword(this.oldPassword + '') : false
    },
    validNewPassword() {
      return !!this.newPassword.match(/[A-Z]/g) && !!this.newPassword.match(/[a-z]/g) && !!this.newPassword.match(/[0-9]/g) && this.newPassword.length >= 8
    },
    matchPasswordsStr() {
      if (this.validOldPassword && this.newPassword.length && this.confirmPassword.length) {
        return this.newPassword === this.confirmPassword ? '' : 'Passwords don’t match'
      } else {
        return 'empty'
      }
    },
    matchPasswordsError() {
      return this.matchPasswordsStr === 'empty' ? '' : this.matchPasswordsStr
    }
  },
  created() {
    this.isCentered = document.querySelector('body').clientWidth < 800
  },
  methods: {
    ...mapActions({
      toggle: 'changePassword/toggleModal',
      setPasswordStep: 'changePassword/setPasswordStep'
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
