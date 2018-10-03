<template>
  <div class="login-container">
    <div class="login h-full sm:h-auto">
      <div class="login__title">Login</div>
      <!-- tabs will go here to switch between this and brainkey/lockfile login -->
      <!-- <div class="login__form">
        <VInput
          v-model.trim="name"
          :autofocus="true"
          :error="nameErrorMsg"
          title="account name"
          @input="$v.name.$touch()"
        />
        <VInput
          v-model.trim="password"
          :error="passwordErrorMsg"
          type="password"
          title="password"
          @input="$v.password.$touch()"
        />

      </div> -->
      <div class="login__brainkey">
        <VInput
          v-model.trim="brainkey"
          :autofocus="true"
          :error="brainkeyErrorMsg"
          tip="Enter 16 words backed up when account was created"
          title="backup phrase"
          @input="$v.brainkey.$touch()"
        />

        <VInput
          v-model.trim="pin"
          :error="pinErrorMsg"
          tip="PIN code encrypts the private key, stored on this device"
          title="create pin code"
          @input="$v.pin.$touch()"
        />

        <VInput
          v-model.trim="confirmPin"
          :error="confirmPinErrorMsg"
          title="confirm pin"
          @input="$v.confirmPin.$touch()"
        />
        <Button
          :disabled="loginDisabled"
          :loading="inProgress"
          class="login__btn"
          width="full"
          text="log in"
          @click="handleLogin"/>

      </div>
      <div class="login__footer">
        <router-link :to="{ name: 'login' }">Sign up with new account</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/Input/'
import Button from '@/components/Button/'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: { VInput, Button },
  mixins: [validationMixin],
  validations() {
    return this.type === 'cloud'
      ? {
        name: { required },
        password: { required }
      }
      : {
        brainkey: { required },
        pin: { required, minLength: minLength(6) },
        confirmPin: { sameAsPin: sameAs('pin') }
      }
  },
  data() {
    return {
      name: '',
      password: '',
      brainkey: '',
      pin: '',
      confirmPin: '',
      inProgress: false,
      type: 'brainkey'
    }
  },
  computed: {
    nameErrorMsg() {
      return (!this.$v.name.required && this.$v.name.$dirty) ? 'Enter username' : ''
    },
    passwordErrorMsg() {
      return (!this.$v.password.required && this.$v.password.$dirty) ? 'Enter password' : ''
    },
    brainkeyErrorMsg() {
      return (!this.$v.brainkey.required && this.$v.brainkey.$dirty) ? 'Enter backup phrase' : ''
    },
    pinErrorMsg() {
      if (!this.$v.pin.$dirty) return ''
      if (!this.$v.pin.required) return 'Enter PIN'
      if (!this.$v.pin.minLength) return 'PIN must be 6 characters or more'
    },
    confirmPinErrorMsg() {
      if (!this.$v.confirmPin.$dirty) return ''
      if (!this.$v.confirmPin.sameAsPin) return 'PIN codes do not match'
    },
    loginDisabled() {
      return this.$v.$dirty && this.$v.$invalid
    }
  },
  methods: {
    ...mapActions({
      cloudLogin: 'acc/cloudLogin',
      brainkeyLogin: 'acc/brainkeyLogin'
    }),
    async handleLogin() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.inProgress = true
      if (this.type === 'cloud') {
        const { error } = await this.cloudLogin({
          name: this.name,
          password: this.password
        })
        if (!error) this.$router.push({ name: 'main' })
      } else {
        const { error } = await this.brainkeyLogin({
          brainkey: this.brainkey.toLowerCase(),
          password: this.pin
        })
        if (!error) this.$router.push({ name: 'main' })
      }
      this.inProgress = false
    }
  }
}
</script>

<style lang="scss">
  .login-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login {
    @apply max-w-sm w-full shadow-md;
    border-radius: 2px;
    flex-shrink: 0;
    background-color: black;
    &__title {
      @apply pt-5 pb-4 text-lg font-gotham-medium;
      color: config('colors.text-primary');
      text-align: center;
      text-transform: uppercase;
    }
    &__form,
    &__brainkey {
      @apply p-card;
    }
    &__btn {
      @apply mt-2;
    }
    &__footer {
      text-align: center;
      @apply pb-card;
    }
  }
</style>
