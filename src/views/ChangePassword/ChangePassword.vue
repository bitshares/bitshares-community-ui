<template>
  <div class="password-container">
    <div class="password-title">First, confirm your current password and then create a new one</div>
    <div class="password-wrapper">
      <VInput
        v-model="oldPassword"
        :centered="isCentered"
        :errors="$v.oldPassword"
        :password="true"
        input-name = "oldPassword"
        title="Enter old password"
        class="password"
      />
      <VInput
        v-model="newPassword"
        :centered="isCentered"
        :errors="$v.newPassword"
        :password="true"
        input-name = "newPassword"
        title="Create new password"
        tip="Min. 6 characters"
        class="password"
      />
      <VInput
        v-model="confirmPassword"
        :centered="isCentered"
        :errors="$v.confirmPassword"
        :password="true"
        input-name = "confirmPassword"
        title="Reenter new password"
        class="password"
      />
    </div>
    <div class="password-btn-wrapper">
      <Button
        :disabled="changeDisabled"
        text="Next"
        width="full"
        class="password-btn-item"
        @click="processChange"
      />
      <Button
        text="Cancel"
        width="full"
        type="faded"
        class="password-btn-item"
        @click="toggle"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import VInput from '@/components/Input/'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import Button from '@/components/Button'

export default {
  components: {
    VInput,
    Button
  },
  mixins: [validationMixin],
  validations() {
    return {
      oldPassword: {
        valid: this.isValidPassword
      },
      newPassword: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: { sameAsPassword: sameAs('newPassword') }
    }
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
    changeDisabled() {
      return this.$v.$dirty && this.$v.$invalid
    }
  },
  created() {
    this.isCentered = document.querySelector('body').clientWidth < 800
  },
  methods: {
    ...mapActions({
      toggle: 'changePassword/toggleModal',
      setPasswordStep: 'changePassword/setPasswordStep',
      changePassword: 'acc/changePassword'
    }),
    async processChange() {
      await this.changePassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })
      this.setPasswordStep('finish')
    }
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
