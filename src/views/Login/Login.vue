<template>
  <div class="login-container sm:pt-32 sm:items-start">
    <div class="login h-full sm:h-auto">
      <div class="login__title">Login</div>
      <Tabs
        :tabs="['password', 'private key']"
        @change="changeLoginType">

        <div
          slot="password"
          class="login__form">

          <VInput
            v-model.trim="name"
            :errors="$v.name"
            input-name="userName"
            class="mb-2"
          />

          <VInput
            v-model.trim="password"
            :errors="$v.password"
            input-name="password"
            type="password"
            class="mb-2"
          />

        </div>
        <div
          slot="private key"
          class="login__form">
          <VInput
            v-model.trim="brainkey"
            :errors="$v.brainkey"
            input-name="brainkey"
            class="mb-4"
          />

          <KeyfileLoader/>

          <VInput
            v-model.trim="pin"
            :errors="$v.pin"
            input-name="pin"
            class="mb-4"
            type="number"
          />

          <VInput
            v-model.trim="confirmPin"
            :errors="$v.confirmPin"
            input-name="confirmPin"
            type="number"
          />
        </div>
      </Tabs>

      <div class="login__form">
        <Button
          :disabled="loginDisabled"
          :loading="inProgress"
          class="login__btn"
          width="full"
          text="log in"
          @click="handleLogin"
        />
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
import Tabs from '@/components/Tabs/'
import KeyfileLoader from './KeyfileLoader'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: { VInput, Button, Tabs, KeyfileLoader },
  mixins: [validationMixin],
  validations() {
    return this.type === 'password'
      ? {
        name: { required },
        password: { required },
        brainkey: {},
        pin: {},
        confirmPin: {}
      }
      : {
        name: {},
        password: {},
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
      type: 'password',
      loginError: false
    }
  },
  computed: {
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
      this.loginError = false
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.inProgress = true
      if (this.type === 'password') {
        const { error } = await this.cloudLogin({
          name: this.name,
          password: this.password
        })
        if (error) this.$toast.error('Invalid username or password')
        else this.$router.push({ name: 'main' })
      } else {
        const { error } = await this.brainkeyLogin({
          brainkey: this.brainkey.toLowerCase(),
          password: this.pin
        })
        if (error) this.$toast.error('Invalid brainkey')
        else this.$router.push({ name: 'main' })
      }
      this.inProgress = false
    },
    changeLoginType(type) {
      this.loginError = false
      this.type = type
      this.$nextTick(() => { this.$v.$reset() })
    }
  }
}
</script>

<style lang="scss">
  .login-container {
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .login {
    @apply max-w-sm w-full shadow-md;
    border-radius: 2px;
    background-color: black;
    &__title {
      @apply pt-5 pb-4 text-lg font-gotham-medium;
      color: config('colors.text-primary');
      text-align: center;
      text-transform: uppercase;
    }
    &__form {
      @apply p-card pb-0;
    }
    &__btn {
      @apply mb-2;
    }
    &__footer {
      text-align: center;
      @apply pb-card;
    }
  }
</style>
